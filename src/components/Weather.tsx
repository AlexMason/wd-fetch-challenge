/* eslint-disable @typescript-eslint/no-empty-interface */
import React from "react";

export interface WeatherProps {}

export interface WeatherState {
  name: string;
  temperature: number;
}

class Weather extends React.Component<WeatherProps, WeatherState> {
  constructor(props: WeatherProps) {
    super(props);

    this.state = {
      name: "",
      temperature: 0,
    };
  }

  componentDidMount() {
    const geolocation = navigator.geolocation;
    const apikey = "33537a91949ec01f099f6de6a937755f";

    geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      fetch(
        `//api.openweathermap.org/data/2.5/weather?units=imperial&lat=${latitude}&lon=${longitude}&appid=${apikey}`,
        { headers: {} }
      )
        .then((res) => res.json())
        .then((data) => {
          this.setState({
            name: data.name,
            temperature: data.main.temp,
          });
        });
    });
  }

  render() {
    return (
      <WeatherDisplay
        name={this.state.name}
        temperature={this.state.temperature}
      />
    );
  }
}

export interface WeatherDisplayProps {
  name: string;
  temperature: number;
}

const WeatherDisplay = (props: WeatherDisplayProps) => {
  return (
    <div>
      It is currently {props.temperature}&deg;F in {props.name}
    </div>
  );
};

export default Weather;
