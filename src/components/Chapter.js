import React, { useState } from 'react';
import { Card, Button, Collapse } from 'react-bootstrap';
import '../styles/Chapter.css';

const Chapter = ({ chapter }) => {
  const [open, setOpen] = useState(false);

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
          </Card.Body>
        </div>
      </Collapse>
    </Card>
  );
};

export default Chapter;
