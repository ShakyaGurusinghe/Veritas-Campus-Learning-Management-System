import React from "react";
import home from "../../assets/WelcomePage.png";
// import campusImage from "../../assets/home2.png";

const Home = () => {
  return (
    <div>
      <div class="container-fluid p-0">
        <img src={home} class="img-fluid w-100" alt="Home Page"></img>
      </div>
      <div className="container text-center mt-5">
        <h2
          className="fw-bold fs-2 fs-md-3 fs-sm-4 "
          style={{ color: "#55B649" }}
        >
          About Our Excellence
        </h2>
        <div className="row mt-4">
          <div className="col-6 col-md-3 mb-4">
            <h4 className="fw-bold ">2020</h4>
            <small className="text-muted">The Year was founded</small>
          </div>
          <div className="col-6 col-md-3 mb-4">
            <h4 className="fw-bold ">11200+</h4>
            <small className="text-muted">Students Studying Right Now</small>
          </div>
          <div className="col-6 col-md-3 mb-4">
            <h4 className="fw-bold ">1200</h4>
            <small className="text-muted">Students graduated every year</small>
          </div>
          <div className="col-6 col-md-3 mb-4">
            <h4 className="fw-bold ">4</h4>
            <small className="text-muted">Fully Functional Faculties</small>
          </div>
        </div>
      </div>

      {/* new Section - Campus Summary*/}
      <div className="container mt-5 mb-5">
        <div className="row align-items-center">
          {/*left side image */}
          <div className="col-md-6 d-none d-md-block">
            {/* <img
              src={campusImage}
              alt="Campus Summary"
              className="img-fluid rounded shadow"
              style={{ maxHeight: "500px", objectFit: "cover", width: "100%" }}
            /> */}
          </div>

          <div className="col-md-6 mb-4 mb-md-0">
            <p className="text-muted">
              Welcome to our distinguished university, where we nurture Sri
              Lankan students through inclusive education and a diverse range of
              courses. Our institution is committed to empowering learners with
              cutting-edge programs in technology, humanities, and business,
              ensuring they acquire the knowledge and skills needed for success.
            </p>
            <p className="text-muted">
              Our experienced faculty fosters academic excellence, using
              innovative teaching methods and state-of-the-art facilities to
              inspire curiosity and lifelong learning. We go beyond academics,
              emphasizing critical thinking, creativity, and ethical values to
              shape responsible global citizens.
            </p>
            <p className="text-muted">
              At our university, education is a transformative force that
              prepares students for both professional success and personal
              growth. We believe in creating opportunities that help individuals
              realize their potential and contribute meaningfully to society.
            </p>
            <p className="text-muted">
              Join us on a journey where learning transcends boundaries, and
              students are empowered to drive their own success. At our
              university, we don’t just provide education—we build futures.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
