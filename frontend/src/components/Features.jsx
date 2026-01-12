import React from 'react';

const features = [
  { title: 'Professional', text: 'Our team of professional movers are trained to prioritize efficiency and safety.', icon: 'bi-box-seam' },
  { title: 'Countrywide', text: 'We offer services for local and long-distance moves with transparent pricing.', icon: 'bi-truck' },
  { title: 'Personal Touch', text: 'We provide a personalized experience and attentive customer support.', icon: 'bi-chat-dots' }
];

export default function Features(){
  return (
    <section className="features">
      <div className="container-centered">
        <h3 style={{marginBottom:20}}>Why Move With Us?</h3>
        <div className="row">
          {features.map((f, idx) => (
            <div key={idx} className="col-md-4">
              <div className="feature-item">
                <div className="icon"><i className={`bi ${f.icon}`} /></div>
                <h5>{f.title}</h5>
                <p>{f.text}</p>
                <a href="/packages" className="text-primary">Get a quote</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
