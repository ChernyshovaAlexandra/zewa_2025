import styled from 'styled-components';

export const ScannerContainer = styled.div`
  min-height: 75vh;
  margin-top: -1.5rem;

  @media screen and (min-width: 500px) {
    min-height: 90vh;
  }
`;

export const CloseButtonContainer = styled.div`
  width: fit-content;
  position: absolute;
  bottom: 2rem;
  left: 0;
  right: 0;
  margin: 0 auto;
`;

export const ScannerBox = styled.div`
  video {
    height: 300px !important;
    width: 300px !important;
    margin: 0 auto;
    object-fit: cover;
    max-width: 100% !important;

    @media screen and (min-width: 500px) {
      height: 450px !important;
      width: 450px !important;
    }
  }
  > div > div > div {
    height: 300px !important;
    width: 300px !important;
    max-width: 100% !important;
    margin: auto;

    @media screen and (min-width: 500px) {
      height: 450px !important;
      width: 450px !important;
    }
    svg path {
      stroke: white !important;
    }
  }

  video::-webkit-media-controls-start-playback-button {
    display: none;
    opacity: 0;
  }
  video::-webkit-media-controls-play-button {
    display: none !important;
    pointer-events: none !important;
    opacity: 0;
  }

  video::-webkit-media-controls-volume-slider {
    display: none !important;
    opacity: 0;
  }

  video::-webkit-media-controls-mute-button {
    display: none !important;
    opacity: 0;
  }

  video::-webkit-media-controls-timeline {
    display: none !important;
    opacity: 0;
  }

  video::-webkit-media-controls-current-time-display {
    opacity: 0;
  }
`;
