import React from 'react';
import { User, Calendar, FileText } from 'lucide-react';

const InmateCard = ({ name, expiration, caseDetails }) => {
  return (
    <div className="inmate-card">
      <div className="inmate-info">
        <div className="info-item">
          <User className="icon" />
          <span>{name}</span>
        </div>
        <div className="info-item">
          <Calendar className="icon" />
          <span>{expiration}</span>
        </div>
        <div className="info-item">
          <FileText className="icon" />
          <span>{caseDetails}</span>
        </div>
      </div>
    </div>
  );
};

export default InmateCard;

// CSS to be added to your index.css or a separate component CSS file


// You can include this in your component if you're using CSS-in-JS,
// or you can add it to your global CSS file.