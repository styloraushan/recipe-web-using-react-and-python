import React from "react";
import "./TeamInfo.css"; // Import external CSS

const teamMembers = [
  {
    name: "Raushan Kumar",
    role: "Lead Developer",
    image: "https://media.licdn.com/dms/image/v2/D5603AQGrvat69Nf0jA/profile-displayphoto-shrink_400_400/B56ZVJHpiLGUAg-/0/1740688497883?e=1746057600&v=beta&t=FEOqCiX5pCpjSbm6xwlmOwxtk0V78UWBME13J2mwUrc",
    bio: "Passionate about software development and AI solutions.",
  },
  {
    name: "John Doe",
    role: "UI/UX Designer",
    image: "https://media.licdn.com/dms/image/v2/D5635AQG0mH7hNXfG8w/profile-framedphoto-shrink_400_400/profile-framedphoto-shrink_400_400/0/1723194370135?e=1741338000&v=beta&t=CD4IyWePvhbO-ra-fxIgiW04WuJbfkte9p_JrEOXLvU",
    bio: "Creating user-friendly and stunning UI designs.",
  },
 
  {
    name: "Saurabh kumar singh",
    role: "Backend Engineer",
    image: "https://media.licdn.com/dms/image/v2/D5603AQHQ5nC514B8ZA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1731124740099?e=1746057600&v=beta&t=PoqdH5Y1qK9Avb6zd1oW9rspfb4C4FEFndimCGHYtg4",
    bio: "Building scalable and secure backend architectures.",
  },
 
];

const TeamInfo = () => {
  return (
    <div className="team-section">
      <h1 className="team-title">Meet Our Team</h1>
      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.image} alt={member.name} className="team-image" />
            <h3 className="team-name">{member.name}</h3>
            <p className="team-role">{member.role}</p>
            <p className="team-bio">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamInfo;
