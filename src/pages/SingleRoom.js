import React, { Component } from "react";
import { Link } from "react-router-dom";
import Banner from "../Components/Banner";
import Hero from "../Components/Hero";
import { RoomContext } from "../context";
import StyledHero from "../Components/StyledHero";
class SingleRoom extends Component {
  state = {
    slug: "",
  };

  static getDerivedStateFromProps(props, state) {
    return {
      slug: props.match.params.slug,
    };
  }

  static contextType = RoomContext;

  render() {
    const { slug } = this.state;
    const { getRoom } = this.context;
    const room = getRoom(slug);
    console.log(room);
    if (room === undefined) {
      return (
        <div className="error">
          <h3>No such Room could be found...</h3>
          <Link to="/rooms" className="btn-primary">
            Back to Rooms
          </Link>
        </div>
      );
    } else {
      const {
        name,
        description,
        size,
        pets,
        breakfast,
        type,
        price,
        extras,
        capacity,
        images,
      } = room;
      const [main, ...defaultImages] = images;
      console.log(defaultImages);

      return (
        <>
          <StyledHero img={images[0] || this.state.defaultBcg}>
            <Banner title={`${name} room`}>
              <Link to="/rooms" className="btn-primary">
                back to rooms
              </Link>
            </Banner>
          </StyledHero>
          <section className="single-room">
            <div className="single-room-images">
              {defaultImages.map((item, index) => (
                <img key={index} src={item} alt={name} />
              ))}
            </div>
            <div className="single-room-info">
              <article className="desc">
                <h3>details</h3>
                <p>{description}</p>
              </article>
              <article className="info">
                <h3>info</h3>
                <h6>price : ${price}</h6>
                <h6>size : {size} SQFT</h6>
                <h6>
                  max capacity :
                  {capacity > 1 ? `${capacity} people` : `${capacity} person`}
                </h6>
                <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
                <h6>{breakfast && "free breakfast included"}</h6>
              </article>
            </div>
          </section>
          <section className="room-extras">
            <h6>extras </h6>
            <ul className="extras">
              {extras.map((item, index) => (
                <li key={index}>- {item}</li>
              ))}
            </ul>
          </section>
        </>
      );
    }
  }
}

export default SingleRoom;
