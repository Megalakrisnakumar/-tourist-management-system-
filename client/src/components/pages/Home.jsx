import React from 'react'
import "../../styles/home.css"
import { Container, Row, Col } from 'reactstrap'
import heroImg from "../../assets/images/hero-img01.jpg"
import heroImg02 from '../../assets/images/hero-img02.jpg'
import heroVideo from '../../assets/images/hero-video.mp4'
import experienceImg from '../../assets/images/trip.png'

import ServiceList from '../../services/ServiceList'
import FeaturedTourList from '../Featured-tours/FeaturedTourList'
import MasonryImagesGallery from '../Image-gallery/MasonryImagesGallery'
import Testimonials from '../Testimonial/Testimonials'
import Newsletter from '../../shared/Newsletter'
import Accommodations from '../Accomondation/Accomondations'
import MapPage from './mappage'

const Home = () => {
  return <>
    {/*================== Hero Section Start ====================*/}
    <section className="hero-section">
      <Container>
        <Row>
          <Col lg='6'>
            <div className="hero__content">
              <h1>Discover the World with Us!<span className="highlight"> </span></h1>
              <p>Adventure awaits! Embrace the thrill of new experiences, breathtaking landscapes, and unforgettable moments. Your journey to extraordinary destinations starts here.</p>
            </div>
          </Col>
          <Col lg='2'>
            <div className='hero__img-box'>
              <img src={heroImg} alt="Travel" />
            </div>
          </Col>
          <Col lg='2'>
            <div className='hero__img-box mt-4'>
              <video src={heroVideo} alt="Scenic Video" controls />
            </div>
          </Col>
          <Col lg='2'>
            <div className='hero__img-box mt-5'>
              <img src={heroImg02} alt="Tour" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    {/*================== Hero Section End ==================*/}

    <section>
      <Container>
        <Row>
          <Col lg="3">
            <h5 className="services__subtitle">Our Services</h5>
            <h2 className="services__title">Premium Travel Experiences</h2>
          </Col>
          <ServiceList />
        </Row>
      </Container>
    </section>

    <section>
      <Container>
        <Row>
          <Col lg='12' className='mb-5'>
            <h5 className="services__subtitle">Explore</h5>
            <h2 className="featured__tour-title">Handpicked Tours for You</h2>
          </Col>
          <FeaturedTourList />
        </Row>
      </Container>
    </section>

    <section>
      <Container>
        <Row>
          <Col lg='12' className='mb-5'>
            <h5 className="services__subtitle">Luxury Stays</h5>
            <h2 className="featured__tour-title">Exclusive Accommodations</h2>
          </Col>
          <Accommodations />
        </Row>
      </Container>
    </section>

    <section>
      <Container>
        <Row>
          <Col lg='6'>
            <div className="experience__content">
              <h5 className="services__subtitle">Our Experience</h5>
              <h2>Expertise that Makes Every Journey Special</h2>
              <p>
                Embark on remarkable journeys with our expert guidance. We curate experiences that inspire, rejuvenate, and create lifelong memories.
              </p>
            </div>
            <div className="counter__wrapper d-flex align-items-center gap-5">
              <div className="counter__box">
                <span>15k+</span>
                <h6>Happy Travelers</h6>
              </div>
              <div className="counter__box">
                <span>3k+</span>
                <h6>Returning Customers</h6>
              </div>
              <div className="counter__box">
                <span>12</span>
                <h6>Years in the Industry</h6>
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="experience__img">
              <img src={experienceImg} alt="Experience" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>

    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <h5 className="services__subtitle">Gallery</h5>
            <h2 className="gallery__title">Capturing Moments from Our Journeys</h2>
          </Col>
          <Col lg='12'>
            <MasonryImagesGallery />
          </Col>
        </Row>
      </Container>
    </section>

    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <h5 className="services__subtitle">What Our Travelers Say</h5>
            <h2 className="testimonial__title">Heartfelt Reviews from Happy Customers</h2>
          </Col>
          <Col lg='12'>
            <Testimonials />
          </Col>
        </Row>
      </Container>
    </section>
<MapPage/>
    <Newsletter />
  </>
}

export default Home

