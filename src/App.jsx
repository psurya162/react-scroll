import React, { useEffect, useRef, useState } from 'react';
import './App.css'; // Create a CSS file for styles

const chapters = [
  { id: 'chapter1', title: 'Chapter 1', content: 'This is the content of Chapter 1.' },
  { id: 'chapter2', title: 'Chapter 2', content: 'This is the content of Chapter 2.' },
  { id: 'chapter3', title: 'Chapter 3', content: 'This is the content of Chapter 3.' },
];

const App = () => {
  const [activeChapter, setActiveChapter] = useState(chapters[0].id);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveChapter(entry.target.id);
        }
      });
    });

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <aside className="sidebar">
        <h2>Chapters</h2>
        <ul>
          {chapters.map((chapter) => (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                className={activeChapter === chapter.id ? 'active' : ''}
              >
                {chapter.title}
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <main className="content">
        {chapters.map((chapter, index) => (
          <section
            key={chapter.id}
            id={chapter.id}
            ref={(el) => (sectionRefs.current[index] = el)}
            className="section"
          >
            <h2>{chapter.title}</h2>
            <p>{chapter.content}</p>
          </section>
        ))}
      </main>
    </div>
  );
};

export default App;
