// src/components/Storytelling.jsx
import React, { useState } from 'react';

export default function Storytelling() {
  const maxLength = 300;
  const [subject, setSubject] = useState('');

  const handleChange = (e) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setSubject(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: hook this up to your generation logic
    console.log('Create metaphors for:', subject);
  };

  const styles = {
    container: {
    //   color: '#FFFFFF',
        border: '1px solid',
      padding: '24px',
      borderRadius: '8px',
      fontFamily: 'sans-serif',
    },
    title: {
      fontSize: '20px',
      fontWeight: 600,
      marginBottom: '4px',
    },
    instruction: {
      fontSize: '14px',
    //   color: '#A1A1AA',
      marginBottom: '16px',
    },
    label: {
      fontSize: '12px',
      fontWeight: 500,
      marginBottom: '4px',
      display: 'block',
    },
    textarea: {
      width: '90%',
      height: '100px',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid',

    //   color: '#E4E4E7',
      fontSize: '14px',
      resize: 'none',
    },
    charCount: {
      textAlign: 'right',
      fontSize: '12px',
    //   color: '#71717A',
      marginTop: '4px',
    },
    button: {
      marginTop: '16px',
      width: '100%',
      padding: '12px',
      background: '#8B5CF6',
      border: 'none',
      borderRadius: '4px',
    //   color: '#FFFFFF',
      fontSize: '16px',
      fontWeight: 500,
      cursor: subject.trim() ? 'pointer' : 'not-allowed',
      opacity: subject.trim() ? 1 : 0.6,
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Presentation</h1>
      <p style={styles.instruction}>
        Tell us your story
      </p>

      <form onSubmit={handleSubmit}>

        <textarea
          id="presentation-subject"
          placeholder="Enter Prompt"
          value={subject}
          onChange={handleChange}
          maxLength={maxLength}
          style={styles.textarea}
        />
        <div style={styles.charCount}>
          {subject.length}/{maxLength}
        </div>
        <button
          type="submit"
          style={styles.button}
          disabled={!subject.trim()}
        >
          Create metaphors
        </button>
      </form>
    </div>
  );
}
