import './About.css'

function About() {
  return (
    <div className="about">
      <div className="about-header">
        <h1>About WebGames</h1>
        <p>Learn more about our mission and what makes us special</p>
      </div>
      
      <div className="about-content">
        <section className="mission">
          <h2>Our Mission</h2>
          <p>
            At WebGames, we're passionate about bringing the joy of gaming to everyone, everywhere. 
            Our platform offers a curated collection of high-quality web games that can be played 
            instantly in your browser without any downloads or installations.
          </p>
        </section>
        
        <section className="values">
          <h2>What We Stand For</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>🎯 Quality First</h3>
              <p>Every game in our collection is carefully selected and tested to ensure the best gaming experience.</p>
            </div>
            <div className="value-item">
              <h3>🌍 Accessibility</h3>
              <p>We believe great games should be accessible to everyone, regardless of their device or technical expertise.</p>
            </div>
            <div className="value-item">
              <h3>⚡ Performance</h3>
              <p>Our platform is optimized for speed and efficiency, ensuring smooth gameplay on any device.</p>
            </div>
            <div className="value-item">
              <h3>🔒 Privacy</h3>
              <p>We respect your privacy and don't collect unnecessary data. Just pure gaming fun.</p>
            </div>
          </div>
        </section>
        
        <section className="story">
          <h2>Our Story</h2>
          <p>
            Founded in 2024, WebGames started as a simple idea: make great games accessible to everyone. 
            We noticed that while mobile app stores were flooded with games, the web gaming experience 
            was often overlooked. We set out to change that by creating a platform that showcases the 
            best of what web gaming has to offer.
          </p>
          <p>
            Today, we continue to grow our collection and improve our platform, always with our users 
            at the center of everything we do.
          </p>
        </section>
      </div>
    </div>
  )
}

export default About 