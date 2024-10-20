import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/ProductDetail.css'


const ProductDetailsPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Get the current user ID from local storage
  const currentUserId = localStorage.getItem('userId'); // Assuming 'userId' is stored as a string

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`);
        setProduct(response.data);
        
        // Fetch comments if applicable
        const commentsResponse = await axios.get(`${import.meta.env.VITE_API_URL}/products/${id}/comments`);
        setComments(commentsResponse.data);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!currentUserId) {
      console.error('User is not logged in');
      return;
    }

    // Post new comment to server
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/products/${id}/comments`, { 
        text: newComment, 
        userId: currentUserId // Use currentUserId directly
      });

      // Append the new comment along with userId for local state
      setComments([...comments, { text: newComment, userId: currentUserId, id: response.data.id }]); // Assuming the server returns the comment ID
      setNewComment(''); // Clear the input
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  return (
    <div>
      {loading && <p>Loading product details...</p>}
      {error && <p className="text-danger">{error}</p>}
      {product && (
        <div>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: ₹{product.price}</p>
          {/* Render other product details here */}

          {/* Comment Section */}
          <h2>Comments</h2>
          <form onSubmit={handleCommentSubmit}>
            <input 
              type="text" 
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)} 
              placeholder="Add a comment" 
              required // Optional: make it required
            />
            <button type="submit">Submit</button>
          </form>
          <div>
            {comments.map((comment, index) => (
              <p key={index}>
                {comment.text} {comment.userId && <span>(User ID: {comment.userId})</span>}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailsPage;
