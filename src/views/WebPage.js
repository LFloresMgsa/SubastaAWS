import React from 'react';
import '../vendor/bootstrap/css/bootstrap.min.css';
import '../css/agency.min.css';


const WebPage = () => {
  return (
    <div className="container">

      {/* <!-- Servicios --> */}
      <section className="page-section" id="services">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">Servicios</h2>
              <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur, adipisicing
                elit. Reprehenderit, obcaecati fugiat perspiciatis enim reiciendis minima minus voluptate
                tenetur temporibus, omnis vero ratione ex, tempora modi recusandae? Aliquam quisquam
                deleniti incidunt?</h3>
            </div>
          </div>
          <div className="row text-center">
            <div className="col-md-4">
              <span className="fa-stack fa-4x">

                <i className="fas fa-circle fa-stack-2x "></i>
                <i className="fas fa-desktop fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="service-heading">Servicio 1</h4>
              <p className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit nemo
                blanditiis beatae culpa consequatur dolore in aut! Perspiciatis, dolorem iure.</p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x "></i>
                <i className="fas fa-chalkboard-teacher fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="service-heading">Servicio 2</h4>
              <p className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati quis
                maxime iste reprehenderit corrupti earum dolore, pariatur placeat culpa ipsa.</p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x "></i>
                <i className="fas fa-briefcase fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="service-heading">Servicio 3</h4>
              <p className="text-muted">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum veniam
                perspiciatis asperiores, veritatis pariatur, minima nesciunt quasi quod, dolorem eligendi
                quae reiciendis eius. Minus magni voluptates sint excepturi sit iure.</p>
            </div>
          </div>
        </div>
      </section>


      {/* <!-- Portfolio Grid --> */}
      <section className="bg-light page-section" id="portfolio">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">Productos</h2>
              <h3 className="section-subheading text-muted">Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Labore, blanditiis?

              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-6 portfolio-item">
              <a className="portfolio-link" data-toggle="modal" href="#portfolioModal1">
                <div className="portfolio-hover">
                  <div className="portfolio-hover-content">
                    <i className="fas fa-plus fa-3x"></i>
                  </div>
                </div>
                {/* <img className="img-fluid" src="img/icons/ico-desarrollo.png" alt=""> */}
              </a>
              <div className="portfolio-caption">
                <h4>Producto 1</h4>
                <p className="text-muted">Titulo 1</p>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 portfolio-item">
              <a className="portfolio-link" data-toggle="modal" href="#portfolioModal2">
                <div className="portfolio-hover">
                  <div className="portfolio-hover-content">
                    <i className="fas fa-plus fa-3x"></i>
                  </div>
                </div>
                {/* <img className="img-fluid" src="img/icons/ico-erp.png" alt=""> */}
              </a>
              <div className="portfolio-caption">
                <h4>Producto 2</h4>
                <p className="text-muted">Titulo 2</p>
              </div>
            </div>
            <div className="col-md-4 col-sm-6 portfolio-item">
              <a className="portfolio-link" data-toggle="modal" href="#portfolioModal3">
                <div className="portfolio-hover">
                  <div className="portfolio-hover-content">
                    <i className="fas fa-plus fa-3x"></i>
                  </div>
                </div>
                {/* <img className="img-fluid" src="img/icons/ico-soporte.png" alt=""> */}
              </a>
              <div className="portfolio-caption">
                <h4>Producto 3</h4>
                <p className="text-muted">Titulo 3</p>
              </div>
            </div>



          </div>
        </div>
      </section>

      {/* <!-- About --> */}
      <section className="page-section" id="about">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">Nosotros</h2>
              <h3 className="section-subheading text-muted">Somos Galpon Legado , Lorem ipsum, dolor sit amet
                consectetur adipisicing elit. Dolor recusandae vel similique, enim ut repellendus
                consectetur itaque rem tempore illo veniam illum voluptatibus incidunt? Nemo ab neque
                temporibus tempora dicta, minus asperiores. Est quasi harum eaque ab ipsam excepturi magni,
                beatae eligendi at officia fuga id facilis ipsum voluptatum nulla.

              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <ul className="timeline">
                <li>
                  <div className="timeline-image">
                    {/* <img className="rounded-circle img-fluid" src="img/about/1.jpg" alt=""> */}
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4>Misión</h4>
                      <h4 className="subheading"></h4>
                    </div>
                    <div className="timeline-body">
                      <p className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Quod doloremque illo quam animi, maiores voluptatibus incidunt
                        necessitatibus quidem neque, beatae soluta vitae error placeat aperiam quos
                        itaque odit dolore temporibus a obcaecati et reprehenderit, ea iusto harum?
                        Alias minima autem odit modi, fugiat nobis, enim laboriosam saepe officia
                        maiores voluptatum?.
                      </p>
                      {/* <br> */}
                      <p className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Tenetur molestiae molestias minus quas obcaecati animi quos quod harum. Et
                        corrupti beatae perspiciatis eius veniam explicabo recusandae magnam aliquid
                        delectus vitae.</p>
                    </div>
                  </div>
                </li>
                <li className="timeline-inverted">
                  <div className="timeline-image">
                    {/* <img className="rounded-circle img-fluid" src="img/about/2.jpg" alt=""> */}
                  </div>
                  <div className="timeline-panel">
                    <div className="timeline-heading">
                      <h4>Visión</h4>
                      <h4 className="subheading"></h4>
                    </div>
                    <div className="timeline-body">
                      <p className="text-muted">Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Sit perspiciatis tenetur amet, placeat a ullam! Aspernatur harum illum
                        praesentium ea!
                      </p>
                      {/* <br> */}
                      <p className="text-muted">Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                        Exercitationem quis voluptas quaerat earum ut unde!
                      </p>

                    </div>
                  </div>
                </li>


              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Contact --> */}
      <section className="page-section" id="contact">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase">Contactanos</h2>

            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="Nursery-img">
                <iframe
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3900.7802167151467!2d-77.03225162450633!3d-12.127184943404202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c81ef7392b37%3A0xb4e33903d44ea11d!2sManagement%20Group%20S.A!5e0!3m2!1ses-419!2spe!4v1684808747319!5m2!1ses-419!2spe"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Footer --> */}
      <section className="footer" id="footer">
        <div className="container">
          <h2 className="section-heading text-uppercase">Dirección</h2>
          <div className="copyright">
            <p>
              Av. Jose de Larco #930 Oficina 302, Miraflores - Lima - Perú<br />
              Correo: ventas@mgsa.com.pe<br />
              Telefonos: +51 014471788<br />
            </p>
          </div>
        </div>
      </section >


    </div >
  );
};


export default WebPage;