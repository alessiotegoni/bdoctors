import { useEffect } from "react";
import { useState } from "react";
import Card from "../../ui/Card";
import { api } from "../../../lib/api";
import SelectSpecializations from "../../ui/SelectSpecializations";
import { LoaderCircle } from "lucide-react";
import { useFilter } from "../../../context/FilterProvider";

import useParallaxEffect from "../../ui/Parallax";

export default function HomePage() {
  useParallaxEffect();

  const [isLoading, setIsLoading] = useState(true);
  const [doctorsList, setDoctorsList] = useState([]);

  const {
    filters: { specializations, doctor },
    setFilters,
  } = useFilter();

  useEffect(() => {
    api
      .get(`/doctors`, {
        params: { specializations, doctor },
      })
      .then((res) => {
        setDoctorsList(res.data.doctors);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setIsLoading(false));
  }, [specializations, doctor]);

  return (
    <>
      <div className="parallax-bg"></div>

      <section className="d-flex flex-column justify-content-center hero-title mb-4 ">
        <div className="container-fluid d-flex flex-column align-items-center mb-4 justify-content-between p-4">
          <h1 className="mb-4 text-center ">
            I migliori medici specialisti<br></br>vicino a te
          </h1>
          <div className="search-link-container">
            <Link to="/doctors/search" className="search-link">
              Ricerca avanzata
            </Link>
          </div>
        </div>

        <SelectSpecializations
          placeholder="Tutte le specializzazioni"
          className="select specializations mb-5 p-4"
          onChange={(values) =>
            setFilters((p) => ({
              ...p,
              specializations: values.map(({ value }) => value),
            }))
          }
        />
      </section>
      <section className="custom-container">
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <LoaderCircle className="loader" size={60} />
          </div>
        ) : (
          <div className="row g-4 align-itmes-center">
            {doctorsList.map((doctor) => (
              <div key={doctor.id} className="col-4 mb-3">
                <Card doctor={doctor} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
