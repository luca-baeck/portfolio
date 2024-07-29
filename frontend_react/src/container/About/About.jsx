import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import './About.scss';
import { urlFor, client } from '../../client';

//import cv from './Lebenslauf von Luca Bäck.pdf'

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    const query = '*[_type == "abouts"] | order(title asc)';

    client.fetch(query).then((data) => {
      setAbouts(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">About <span>me</span> <br />  <span> </span></h2>
      <a className='app__profile-download' role="link" aria-disabled="true" download>Curriculum Vitae</a>
      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: 'tween' }}
            className="app__profile-item"
            key={about.title + index}
          >
            <img src={urlFor(about.imgUrl)} alt={about.title} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>{about.title}</h2>
            <div style={{ marginTop: 10 }}>
            {about.descriptions.map((description, index) => 
                {
                  if(description.includes('https://')) {
                    return <a key={index} href={description} target="_blank" className='link'><p className="p-text">{description}</p></a>
                  }else {
                    return <p key={index} className="p-text">{description}</p>
                  }
                }
            )}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, 'app__about'),
  'about',
  'app__whitebg',
);
