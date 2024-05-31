function getComments() {
    const videoId = document.getElementById('video-id').value;
  
    // Make an AJAX request to the server-side endpoint
    fetch(`/api/get-comments?video_id=${videoId}`)
      .then(response => response.json())
      .then(data => {
        // Process the received comments and replies data (JSON)
        const commentsContainer = document.getElementById('comments-container');
        commentsContainer.innerHTML = '';  // Clear previous content
  
        // Dynamically create and display comments and replies
        for (const comment of data.comments) {
          // Create elements for comment text and reply list
          const commentElement = document.createElement('div');
          commentElement.classList.add('comment');
          commentElement.textContent = comment.textDisplay;
  
          const replyList = document.createElement('ul');
          replyList.classList.add('replies');
  
          if (comment.replies && comment.replies.length > 0) {
            for (const reply of comment.replies) {
              const replyElement = document.createElement('li');
              replyElement.textContent = reply.textDisplay;
              replyList.appendChild(replyElement);
            }
          } else {
            replyList.textContent = 'No replies';
          }
  
          commentsContainer.appendChild(commentElement);
          commentsContainer.appendChild(replyList);
        }
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
        // Handle errors appropriately (e.g., display an error message to the user)
      });
  }
  