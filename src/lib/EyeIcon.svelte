<svg
  class="eye-icon"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 79.3 60"
  role="img"
  aria-label="눈"
>
  <path
    d="M39.64,60c-12.28,0-22.27-9.99-22.27-22.26s9.99-22.26,22.27-22.26,22.26,9.99,22.26,22.26-9.98,22.26-22.26,22.26ZM39.64,23.64c-7.78,0-14.1,6.32-14.1,14.1s6.32,14.1,14.1,14.1,14.1-6.32,14.1-14.1-6.32-14.1-14.1-14.1Z"
  />
  <path
    class="upper-lid"
    d="M39.65,0C21.98,0,6.3,10.95,0,27.11l8.03,2.15c5.3-12.57,17.67-21.05,31.62-21.05s26.32,8.47,31.62,21.05l8.03-2.15C73,10.94,57.32,0,39.65,0Z"
  />
</svg>

<style>
  .eye-icon {
    display: inline-block;
    width: 1em;
    height: auto;
    overflow: visible;
    vertical-align: -0.02em;
    fill: currentColor;
  }

  .upper-lid {
    animation: eye-lid-bob 1.3s linear 2;
  }

  @keyframes eye-lid-bob {
    0%,
    100% {
      transform: translateY(0);
    }
    6.25% {
      transform: translateY(-1.53px);
    }
    12.5% {
      transform: translateY(-2.83px);
    }
    18.75% {
      transform: translateY(-3.7px);
    }
    25% {
      transform: translateY(-4px);
    }
    31.25% {
      transform: translateY(-3.7px);
    }
    37.5% {
      transform: translateY(-2.83px);
    }
    43.75% {
      transform: translateY(-1.53px);
    }
    50% {
      transform: translateY(0);
    }
    56.25% {
      transform: translateY(1.53px);
    }
    62.5% {
      transform: translateY(2.83px);
    }
    68.75% {
      transform: translateY(3.7px);
    }
    75% {
      transform: translateY(4px);
    }
    81.25% {
      transform: translateY(3.7px);
    }
    87.5% {
      transform: translateY(2.83px);
    }
    93.75% {
      transform: translateY(1.53px);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .upper-lid {
      animation: none;
    }
  }
</style>
