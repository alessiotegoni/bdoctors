/* eslint-disable react/prop-types */
import { Star } from "lucide-react";
import { Link } from "react-router-dom";

export default function Card({ doctor }) {
  return (
    <>
      <Link
        to={`/doctors/${doctor.slug}`}
        className="card border-0 main-card p-3 card-background text-decoration-none"
      >
        <div className="card-body d-flex flex-column justify-content-between">
          <div className="flex-grow-1">
            <p className="card-title">
              {doctor.first_name}
              <span> </span>
              {doctor.last_name}
            </p>
            <p className="card-spec purple mb-3">
              Specialista in {doctor.specializations}
            </p>
          </div>

          <div className="mb-4">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className="starAvg text-warning"
                fill={
                  i + 1 <= doctor.avg_rating ? "currentColor" : "transparent"
                }
              />
            ))}
          </div>

          <div className="d-flex justify-content-center">
            <div className="btn-contact-container">
              <button className="btn contact-btn">
                Contatta lo specialista
              </button>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}
