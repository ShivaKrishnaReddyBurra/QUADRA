import React, { useState } from 'react';
import { Card, Button, Collapse } from 'react-bootstrap';
import '../styles/Chapter.css';

const Chapter = ({ chapter }) => {
  const [open, setOpen] = useState(false);
  const [likes, setLikes] = useState(chapter.likes);
  const [dislikes, setDislikes] = useState(chapter.dislikes);

  const handleLike = async () => {
    // Make a request to the backend to register a like
    const response = await fetch(`/api/like/${chapter.id}`, { method: 'POST' });
    if (response.ok) {
      setLikes(likes + 1);
    }
  };

  const handleDislike = async () => {
    // Make a request to the backend to register a dislike
    const response = await fetch(`/api/dislike/${chapter.id}`, { method: 'POST' });
    if (response.ok) {
      setDislikes(dislikes + 1);
    }
  };

  const story = chapter.content.map((paragraph, index) => (
    <p key={index} className="mb-0">{paragraph}<br /><br /></p>
  ));

  return (
    <Card className="mb-3">
      <Card.Header className='card-header'>
        <Button
          variant="link"
          onClick={() => setOpen(!open)}
          aria-controls={`chapter-content-${chapter.id}`}
          aria-expanded={open}
          className='btn-link'
        >
          {chapter.title}
        </Button>
      </Card.Header>
      <Collapse in={open}>
        <div id={`chapter-content-${chapter.id}`} className='collapse'>
          <Card.Body className='card-body'>
            <Card.Text className='card-text'>{story}</Card.Text>
            <div className="like-dislike-buttons">
              <Button variant="success" onClick={handleLike}>Like ({likes})</Button>
              <Button variant="danger" onClick={handleDislike}>Dislike ({dislikes})</Button>
            </div>
          </Card.Body>
        </div>
      </Collapse>
    </Card>
  );
};

export default Chapter;
