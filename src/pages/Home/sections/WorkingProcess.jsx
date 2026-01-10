import React from 'react';
const teamMembers = [
  {
    name: "Arif Hasan",
    role: "Master Tailor",
    img: "https://i.pravatar.cc/150?u=101",
  },
  {
    name: "Nusrat Jahan",
    role: "Lead Fashion Designer",
    img: "https://i.pravatar.cc/150?u=102",
  },
  {
    name: "Sabbir Ahmed",
    role: "Quality Control Head",
    img: "https://i.pravatar.cc/150?u=103",
  },
];

const WorkingProcess = () => {
    return (
        <section className="py-20 bg-base-100">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold uppercase text-base-content">
            The Experts Behind Our Craftsmanship
          </h2>
          <p className="mt-4 text-base-content/70 max-w-2xl mx-auto">
            Meet the skilled professionals who ensure premium quality,
            innovative design, and exceptional craftsmanship in every product
            we create.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="text-center group p-6 rounded-2xl bg-base-200 shadow hover:shadow-lg transition"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-40 h-40 rounded-full mx-auto mb-6 
                grayscale group-hover:grayscale-0 transition-all 
                border-4 border-base-100 shadow-md"
              />

              <h3 className="text-xl font-bold text-base-content">
                {member.name}
              </h3>

              <p className="mt-1 text-primary font-semibold uppercase tracking-widest text-sm">
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    );
};

export default WorkingProcess;