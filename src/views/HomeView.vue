
<template>
  <main class="home-wrapper overflow-hidden">
    <div class="heading-container flex-col flex">
      <div class="heading-bg absolute top-40 ">
      </div>
      <div class="lg:w-6/12 absolute w-full top-40 md:top-32 md:left-0 ">
        <svg class="textdo  ">
          <text class="" x="50%" y="50%" dy=".15em" text-anchor="middle">
            Do you
          </text>
        </svg>
      </div>

      <h1 class="-mt-4">Plant</h1>
      <div class="lg:w-6/12 absolute w-full bottom-48 right-5 md:bottom-32 md:right-0">
        <svg class="">
          <text class="textcare" x="50%" y="40%" dy=".35em" text-anchor="middle">
            Care ?
          </text>
        </svg>
      </div>

    </div>
    <div class="btn-container absolute bottom-32  w-full md:bottom-38  flex items-center md:justify-center">
      <div class="btn-yes">
        <button @click="showSignInModalModal">
          <div class="icon-1">
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 58.56 116.18" class="common-svg" version="1.1"
              xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
              <defs></defs>
              <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                <path
                  d="M51.68 79.32c-5.6,0.48 -18.01,6.61 -22.08,10.58 -0.8,0.78 -1.48,1.77 -2.33,2.43 0.46,-1.76 1.17,-3.5 1.71,-5.18 2.05,-6.36 0.6,-3.94 6.72,-6.92 4.39,-2.13 7.93,-4.39 11.48,-7.91 2.87,-2.84 6.6,-7.49 8.43,-10.95 -3.22,0.75 -8.91,3.73 -12.2,5.14 -3.4,1.56 -7.64,4.64 -10.05,7.42l1.92 -7.77c0.18,-0.6 12.35,-10.32 15.54,-15.33 3.24,-5.07 5.83,-12.73 7.72,-18.52 -3.83,2.95 -11.19,10.7 -14.1,14.29 -2.1,2.58 -4.06,5.29 -6.05,7.95 0.13,-1.52 1.01,-4.66 1.36,-6.17 2.16,-9.19 5.06,-41.4 -1.01,-48.38 0,3.22 -1.49,12.51 -2.05,15.9 -1.29,7.79 -4.08,25.67 -3.07,33.01l0.47 8.51c0.07,2.12 -0.24,6.17 -1.45,7.91 0,-8.9 -9.67,-35.19 -16.51,-40.2 0,5.82 4.29,23.1 6.2,27.9 1.71,4.29 4.8,10.38 7.54,14 1.93,2.55 2.5,2.41 -0.02,9.43l-3.29 11.08 -3.9 -12.16c-2.78,-6.77 -11.01,-23.67 -15.86,-26.92 0,11.78 8.37,33.86 19.11,40.13 -0.29,2.07 -3.42,10.31 -4.93,11.77 -1.78,-10.97 -7.2,-20.86 -13.98,-29.49l-7.03 -8.05c0.06,2.73 1.9,7.3 2.51,10.1 0.36,0.47 3.98,11.12 9.2,19.09 2.49,3.81 6.41,7.11 8.48,10.28 -1.04,3.19 -5.75,9.78 -8.03,12.98l1.81 0.91c2.75,-2.62 8.6,-12.41 9.74,-15.89 6.1,-3.14 7.06,-2.33 14.56,-7.45 5.18,-3.54 5.49,-4.51 8.86,-8.02 1.06,-1.1 4.21,-4.24 4.55,-5.5z"
                  class="fil0"></path>
              </g>
            </svg>
          </div>
          Yes
          <div class="icon-2">
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 55.37 64.87" class="common-svg" version="1.1"
              xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
              <defs></defs>
              <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                <path
                  d="M17.94 25.14c-0.18,-1.53 1.57,-1.52 1.75,-0.4 0.06,0.34 0.08,0.73 0.12,1.08 0.96,7.92 2.52,16.37 6.09,23.51 0.84,1.68 2.15,3.87 3.34,5.34l1.71 1.96c0.21,0.21 0.41,0.44 0.63,0.62 0.14,0.11 0.2,0.14 0.33,0.27 0.11,0.1 0.19,0.19 0.31,0.29 0.46,0.39 0.89,0.75 1.39,1.12 1.42,1.03 3.07,1.95 4.78,2.59 4.8,1.81 10.13,1.83 15.23,1.06 0.68,-0.1 1.49,-0.25 1.7,0.53 0.1,0.38 -0.02,0.7 -0.25,0.91 -0.25,0.23 -0.57,0.25 -0.95,0.31 -6.48,1.02 -13.05,0.8 -18.88,-2.26 -0.54,-0.28 -1.06,-0.59 -1.55,-0.91 -1.08,-0.69 -1.86,-1.29 -2.8,-2.12 -1.08,-0.95 -2.08,-2.07 -2.99,-3.18 -0.09,-0.11 -0.19,-0.22 -0.27,-0.33 -0.11,-0.14 -0.14,-0.20 -0.25,-0.35 -0.67,-0.86 -1.38,-1.96 -1.97,-3 -1.94,-3.37 -3.24,-6.71 -4.35,-10.45 -1.57,-5.32 -2.45,-10.73 -3.12,-16.59zm12.76 2.95l-0.16 0.32c-0.03,0.1 -0.06,0.19 -0.1,0.31 -0.07,0.23 -0.11,0.41 -0.1,0.68 0.7,0.23 2.41,-0.38 3.05,-0.59 0.89,-0.28 2.20,-0.58 3.26,-0.52 0.54,0.11 0.77,0.01 1.5,0.32 1.35,0.57 1.98,1.9 1.88,3.46 -0.18,2.6 -1.89,5.58 -3.27,7.62 -1.14,1.69 -1.96,2.53 -2.55,4.68 -0.14,0.52 -0.58,2.64 -0.37,3.11 0.04,0.78 0.27,1.67 0.88,1.87 0.69,0.23 1.58,-0.27 2.09,-0.51 1.19,-0.57 2.65,-1.28 4.20,-1.17 0.47,0.17 0.93,0.28 1.29,0.82 0.89,1.35 0.28,3.98 -0.03,5.37 -0.56,2.55 -1.02,4.24 -2.30,6.18 -0.98,1.5 -2.32,0.23 -1.64,-0.79l0.79 -1.31c0.25,-0.47 0.44,-0.95 0.62,-1.49 0.29,-0.85 1.81,-6.41 0.98,-6.99 -0.73,-0.15 -2.40,0.67 -3.05,0.96 -0.92,0.41 -1.89,0.96 -3.13,0.76 -1.10,-0.18 -1.79,-0.94 -2.15,-1.86 -0.92,-2.34 -0.05,-5.92 1.17,-8.12 0.31,-0.56 1.18,-1.73 1.62,-2.39 1.23,-1.84 3.04,-4.85 3.04,-7.02 -0,-1.47 -0.98,-1.79 -2.39,-1.65 -2.03,0.20 -4.88,1.83 -6.51,0.78 -1.77,-1.14 -0.01,-4.42 0.72,-5.77 0.94,-1.77 1.85,-3.64 2.25,-5.76 0.22,-1.16 0.30,-2.53 -0.22,-3.50 -0.63,-1.19 -1.54,-0.93 -2.94,-0.72 -1.97,0.30 -5.63,0.78 -5.21,-2.29 0.13,-0.97 0.68,-2.13 1.08,-2.94 0.81,-1.65 -0.34,-3.83 -1.40,-5.04 -0.81,-0.93 -1.35,-1.61 -2.77,-2.25 -1.96,-0.88 -4.54,-1.12 -6.78,-0.45 -1.07,0.32 -1.99,0.83 -2.56,1.45 -0.81,0.88 -0.88,1.98 -0.58,3.10 0.53,2.00 2.19,4.52 1.75,6.10 -0.65,2.33 -4.54,1.44 -6.24,1.38 -0.62,-0.02 -1.30,-0.07 -1.84,0.13 -0.53,0.20 -0.75,0.54 -0.87,1.14 -0.26,1.27 0.26,2.13 0.74,3.07 0.96,1.86 1.90,4.14 -0.72,5.38 -1.17,0.56 -1.73,0.29 -1.91,1.10 -0.07,0.30 -0.05,0.56 -0.02,0.88 0.18,1.78 1.57,3.95 3.47,4.56 1.85,0.60 3.93,1.44 5.46,2.57 3.24,2.38 2.89,5.46 -0.07,7.33 -0.41,0.26 -0.82,0.49 -1.28,0.73 -1.52,0.82 -2.36,2.16 -1.84,3.96 0.53,1.85 2.28,3.21 4.28,3.75 1.03,0.28 2.47,0.35 3.59,0.45 1.21,0.11 2.41,0.26 3.56,0.47 0.80,0.15 2.38,0.53 2.84,1.18 1.14,1.63 -0.30,2.83 -1.10,4.06 -1.10,1.71 -1.07,2.84 0.76,3.80 2.11,1.10 5.85,1.41 8.43,1.62 0.49,0.04 1.37,0.01 1.70,0.30 0.35,0.31 0.39,1.03 0.00,1.36 -0.40,0.34 -1.09,0.20 -1.72,0.15 -4.21,-0.34 -14.48,-1.03 -11,-7.64 0.29,-0.54 0.46,-0.75 0.79,-1.22 0.17,-0.25 0.72,-0.88 0.75,-1.25 -0.51,-0.55 -3.45,-0.86 -4.45,-0.96 -1.52,-0.16 -3.44,-0.23 -4.78,-0.63 -0.86,-0.25 -2.06,-0.78 -2.74,-1.33 -0.27,-0.22 -0.53,-0.40 -0.74,-0.62 -0.44,-0.44 -0.82,-0.86 -1.21,-1.50 -0.34,-0.56 -0.64,-1.22 -0.78,-1.92 -0.35,-1.69 0.16,-3.13 0.99,-4.16 0.96,-1.19 2.01,-1.47 3.17,-2.25 1.32,-0.89 1.83,-2.13 0.73,-3.40 -0.71,-0.82 -1.97,-1.57 -3.23,-2.14 -0.61,-0.27 -1.27,-0.54 -1.94,-0.77 -0.70,-0.24 -1.38,-0.43 -1.94,-0.77 -2.17,-1.32 -4.07,-4.74 -3.37,-7.22 0.53,-1.86 2.03,-1.63 3.09,-2.28 0.72,-0.45 0.40,-1.23 0.08,-1.90 -0.89,-1.87 -2.23,-3.88 -0.97,-6.21 1.74,-3.20 6.80,-0.58 8.60,-1.68 0.09,-0.82 -1.14,-3.25 -1.52,-4.39 -0.59,-1.77 -0.75,-3.18 0.19,-4.78 1.36,-2.32 4.94,-3.53 8.60,-3.10 1.68,0.20 3.16,0.69 4.44,1.48 2.22,1.36 4.56,4.61 4.45,7.38 -0.04,0.91 -0.37,1.53 -0.70,2.25 -0.20,0.45 -0.78,1.66 -0.69,2.23 1.33,0.67 4.40,-0.75 6.12,-0.06 1.64,0.66 2.44,2.24 2.44,4.47 0,2.61 -1.32,5.68 -2.50,7.91 -0.21,0.40 -1.09,2.03 -1.07,2.36z"
                  class="fil0"></path>
              </g>
            </svg>
          </div>
        </button>
      </div>
      <div class="btn-no  ">
        <button @click="goToYoutube">
          <div class="icon-1">
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 58.56 116.18" class="common-svg" version="1.1"
              xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
              <defs></defs>
              <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                <path
                  d="M51.68 79.32c-5.6,0.48 -18.01,6.61 -22.08,10.58 -0.8,0.78 -1.48,1.77 -2.33,2.43 0.46,-1.76 1.17,-3.5 1.71,-5.18 2.05,-6.36 0.6,-3.94 6.72,-6.92 4.39,-2.13 7.93,-4.39 11.48,-7.91 2.87,-2.84 6.6,-7.49 8.43,-10.95 -3.22,0.75 -8.91,3.73 -12.2,5.14 -3.4,1.56 -7.64,4.64 -10.05,7.42l1.92 -7.77c0.18,-0.6 12.35,-10.32 15.54,-15.33 3.24,-5.07 5.83,-12.73 7.72,-18.52 -3.83,2.95 -11.19,10.7 -14.1,14.29 -2.1,2.58 -4.06,5.29 -6.05,7.95 0.13,-1.52 1.01,-4.66 1.36,-6.17 2.16,-9.19 5.06,-41.4 -1.01,-48.38 0,3.22 -1.49,12.51 -2.05,15.9 -1.29,7.79 -4.08,25.67 -3.07,33.01l0.47 8.51c0.07,2.12 -0.24,6.17 -1.45,7.91 0,-8.9 -9.67,-35.19 -16.51,-40.2 0,5.82 4.29,23.1 6.2,27.9 1.71,4.29 4.8,10.38 7.54,14 1.93,2.55 2.5,2.41 -0.02,9.43l-3.29 11.08 -3.9 -12.16c-2.78,-6.77 -11.01,-23.67 -15.86,-26.92 0,11.78 8.37,33.86 19.11,40.13 -0.29,2.07 -3.42,10.31 -4.93,11.77 -1.78,-10.97 -7.2,-20.86 -13.98,-29.49l-7.03 -8.05c0.06,2.73 1.9,7.3 2.51,10.1 0.36,0.47 3.98,11.12 9.2,19.09 2.49,3.81 6.41,7.11 8.48,10.28 -1.04,3.19 -5.75,9.78 -8.03,12.98l1.81 0.91c2.75,-2.62 8.6,-12.41 9.74,-15.89 6.1,-3.14 7.06,-2.33 14.56,-7.45 5.18,-3.54 5.49,-4.51 8.86,-8.02 1.06,-1.1 4.21,-4.24 4.55,-5.5z"
                  class="fil0"></path>
              </g>
            </svg>
          </div>
          No
          <div class="icon-2">
            <svg xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 55.37 64.87" class="common-svg" version="1.1"
              xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
              <defs></defs>
              <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer"></metadata>
                <path
                  d="M17.94 25.14c-0.18,-1.53 1.57,-1.52 1.75,-0.4 0.06,0.34 0.08,0.73 0.12,1.08 0.96,7.92 2.52,16.37 6.09,23.51 0.84,1.68 2.15,3.87 3.34,5.34l1.71 1.96c0.21,0.21 0.41,0.44 0.63,0.62 0.14,0.11 0.2,0.14 0.33,0.27 0.11,0.1 0.19,0.19 0.31,0.29 0.46,0.39 0.89,0.75 1.39,1.12 1.42,1.03 3.07,1.95 4.78,2.59 4.8,1.81 10.13,1.83 15.23,1.06 0.68,-0.1 1.49,-0.25 1.7,0.53 0.1,0.38 -0.02,0.7 -0.25,0.91 -0.25,0.23 -0.57,0.25 -0.95,0.31 -6.48,1.02 -13.05,0.8 -18.88,-2.26 -0.54,-0.28 -1.06,-0.59 -1.55,-0.91 -1.08,-0.69 -1.86,-1.29 -2.8,-2.12 -1.08,-0.95 -2.08,-2.07 -2.99,-3.18 -0.09,-0.11 -0.19,-0.22 -0.27,-0.33 -0.11,-0.14 -0.14,-0.20 -0.25,-0.35 -0.67,-0.86 -1.38,-1.96 -1.97,-3 -1.94,-3.37 -3.24,-6.71 -4.35,-10.45 -1.57,-5.32 -2.45,-10.73 -3.12,-16.59zm12.76 2.95l-0.16 0.32c-0.03,0.1 -0.06,0.19 -0.1,0.31 -0.07,0.23 -0.11,0.41 -0.1,0.68 0.7,0.23 2.41,-0.38 3.05,-0.59 0.89,-0.28 2.20,-0.58 3.26,-0.52 0.54,0.11 0.77,0.01 1.5,0.32 1.35,0.57 1.98,1.9 1.88,3.46 -0.18,2.6 -1.89,5.58 -3.27,7.62 -1.14,1.69 -1.96,2.53 -2.55,4.68 -0.14,0.52 -0.58,2.64 -0.37,3.11 0.04,0.78 0.27,1.67 0.88,1.87 0.69,0.23 1.58,-0.27 2.09,-0.51 1.19,-0.57 2.65,-1.28 4.20,-1.17 0.47,0.17 0.93,0.28 1.29,0.82 0.89,1.35 0.28,3.98 -0.03,5.37 -0.56,2.55 -1.02,4.24 -2.30,6.18 -0.98,1.5 -2.32,0.23 -1.64,-0.79l0.79 -1.31c0.25,-0.47 0.44,-0.95 0.62,-1.49 0.29,-0.85 1.81,-6.41 0.98,-6.99 -0.73,-0.15 -2.40,0.67 -3.05,0.96 -0.92,0.41 -1.89,0.96 -3.13,0.76 -1.10,-0.18 -1.79,-0.94 -2.15,-1.86 -0.92,-2.34 -0.05,-5.92 1.17,-8.12 0.31,-0.56 1.18,-1.73 1.62,-2.39 1.23,-1.84 3.04,-4.85 3.04,-7.02 -0,-1.47 -0.98,-1.79 -2.39,-1.65 -2.03,0.20 -4.88,1.83 -6.51,0.78 -1.77,-1.14 -0.01,-4.42 0.72,-5.77 0.94,-1.77 1.85,-3.64 2.25,-5.76 0.22,-1.16 0.30,-2.53 -0.22,-3.50 -0.63,-1.19 -1.54,-0.93 -2.94,-0.72 -1.97,0.30 -5.63,0.78 -5.21,-2.29 0.13,-0.97 0.68,-2.13 1.08,-2.94 0.81,-1.65 -0.34,-3.83 -1.40,-5.04 -0.81,-0.93 -1.35,-1.61 -2.77,-2.25 -1.96,-0.88 -4.54,-1.12 -6.78,-0.45 -1.07,0.32 -1.99,0.83 -2.56,1.45 -0.81,0.88 -0.88,1.98 -0.58,3.10 0.53,2.00 2.19,4.52 1.75,6.10 -0.65,2.33 -4.54,1.44 -6.24,1.38 -0.62,-0.02 -1.30,-0.07 -1.84,0.13 -0.53,0.20 -0.75,0.54 -0.87,1.14 -0.26,1.27 0.26,2.13 0.74,3.07 0.96,1.86 1.90,4.14 -0.72,5.38 -1.17,0.56 -1.73,0.29 -1.91,1.10 -0.07,0.30 -0.05,0.56 -0.02,0.88 0.18,1.78 1.57,3.95 3.47,4.56 1.85,0.60 3.93,1.44 5.46,2.57 3.24,2.38 2.89,5.46 -0.07,7.33 -0.41,0.26 -0.82,0.49 -1.28,0.73 -1.52,0.82 -2.36,2.16 -1.84,3.96 0.53,1.85 2.28,3.21 4.28,3.75 1.03,0.28 2.47,0.35 3.59,0.45 1.21,0.11 2.41,0.26 3.56,0.47 0.80,0.15 2.38,0.53 2.84,1.18 1.14,1.63 -0.30,2.83 -1.10,4.06 -1.10,1.71 -1.07,2.84 0.76,3.80 2.11,1.10 5.85,1.41 8.43,1.62 0.49,0.04 1.37,0.01 1.70,0.30 0.35,0.31 0.39,1.03 0.00,1.36 -0.40,0.34 -1.09,0.20 -1.72,0.15 -4.21,-0.34 -14.48,-1.03 -11,-7.64 0.29,-0.54 0.46,-0.75 0.79,-1.22 0.17,-0.25 0.72,-0.88 0.75,-1.25 -0.51,-0.55 -3.45,-0.86 -4.45,-0.96 -1.52,-0.16 -3.44,-0.23 -4.78,-0.63 -0.86,-0.25 -2.06,-0.78 -2.74,-1.33 -0.27,-0.22 -0.53,-0.40 -0.74,-0.62 -0.44,-0.44 -0.82,-0.86 -1.21,-1.50 -0.34,-0.56 -0.64,-1.22 -0.78,-1.92 -0.35,-1.69 0.16,-3.13 0.99,-4.16 0.96,-1.19 2.01,-1.47 3.17,-2.25 1.32,-0.89 1.83,-2.13 0.73,-3.40 -0.71,-0.82 -1.97,-1.57 -3.23,-2.14 -0.61,-0.27 -1.27,-0.54 -1.94,-0.77 -0.70,-0.24 -1.38,-0.43 -1.94,-0.77 -2.17,-1.32 -4.07,-4.74 -3.37,-7.22 0.53,-1.86 2.03,-1.63 3.09,-2.28 0.72,-0.45 0.40,-1.23 0.08,-1.90 -0.89,-1.87 -2.23,-3.88 -0.97,-6.21 1.74,-3.20 6.80,-0.58 8.60,-1.68 0.09,-0.82 -1.14,-3.25 -1.52,-4.39 -0.59,-1.77 -0.75,-3.18 0.19,-4.78 1.36,-2.32 4.94,-3.53 8.60,-3.10 1.68,0.20 3.16,0.69 4.44,1.48 2.22,1.36 4.56,4.61 4.45,7.38 -0.04,0.91 -0.37,1.53 -0.70,2.25 -0.20,0.45 -0.78,1.66 -0.69,2.23 1.33,0.67 4.40,-0.75 6.12,-0.06 1.64,0.66 2.44,2.24 2.44,4.47 0,2.61 -1.32,5.68 -2.50,7.91 -0.21,0.40 -1.09,2.03 -1.07,2.36z"
                  class="fil0"></path>
              </g>
            </svg>
          </div>
        </button>
      </div>
      <Teleport to="body">
        <transition v-motion :initial="{
          opacity: 0,
            y: 0,
          }" :variants="{ custom: { scale: 2 } }" :enter="{
          opacity: 1,
          y: 0,
          }">
          <div class="modal" v-if="showModal">
            <div class="modal-content">
              <div id="background" class="leaf-background">
                <div class="leaf leaf1"></div>
                <div class="leaf leaf2"></div>
                <div class="leaf leaf3"></div>
                <div class="leaf leaf4"></div>
               
                <div class="leaf leaf6"></div>
              </div>
              <!-- Render SignInModal.vue component here -->
              <SignInModal @close="closeModal" />
              <img id="leafImage" src="" alt="">
            </div>
          </div>

        </transition>
      </Teleport>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import SignInModal from '@/components/SignInModal.vue';


const showModal = ref(false); // This variable controls the modal visibility

const showSignInModalModal = () => {
  showModal.value = true;
};


const closeModal = () => {
  showModal.value = false;
};

// Function to redirect to the YouTube link
const goToYoutube = () => {
  // Redirect the user to the YouTube link.
  window.open('https://youtu.be/6HNoPB_cTwE?si=-eHfsw-ALItePszu', '_blank');
};

</script>

<style lang="scss">
nav {
  visibility: hidden;
}

.home-wrapper {

  .heading-container {
    opacity: 0.7;
    animation: bg 9s infinite;
    background-size: cover;
    font-family: $heading-font;
    letter-spacing: .9em;

    .heading-bg {
      background:
        radial-gradient(circle at bottom, $beige, transparent 80%),
        linear-gradient(to top, $lightgray 0%, transparent 70%),
        linear-gradient(to bottom, transparent, rgba($lightgray, 0.4) 0%),
        $beige;
      animation: bg 9s infinite;
      width: 100%;
      height: 65vh;
      background-size: cover;
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }

    svg {
      font-family: "Racing Sans One", sans-serif;
      width: 100%;
      height: 250px;

      @media (max-width: 768px) {
        font-size: 4em;
        height: 130px;
      }

      text {
        animation: stroke 9s infinite alternate-reverse;
        stroke-width: 3;
        stroke: $darkbeige;
        font-size: 8em;

        @media (max-width: 768px) {
          font-size: 1em;

        }
      }
    }

    h1 {
      position: absolute;
      top: 50%;
      right: 50%;
      transform: translate(50%, -50%);
      z-index: 1;
      text-shadow: 2px 3px 3px rgba(0, 0, 0, 0.3),
        0px -7px 10px rgba(255, 255, 255, 0.3, ), -4px 2px 3px rgba(255, 255, 255, 0.3);
      font-size: 6.5em;
      color: $heading-text;
      font-weight: 900;
    }

  }

}

.btn-container {
  display: flex;
  justify-content: center;
  gap: 10%;

  button {
    position: relative;
    height: 60px;
    width: 20vw;
    font-size: 2em;
    font-weight: bold;
    color: $darkbeige;
    background-color: transparent;
    border: 3px solid $darkbeige;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.5s;
    z-index: 4;
    font-family: $sub-heading-font;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 5px;
      left: 5px;
      background-color: $lightgray;
      border-radius: 8px;
      z-index: -1;
      transition: all 0.5s;
    }

    &:hover::after {
      top: 0;
      left: 0;
      background-color: $beige;
      transform: background-color 1.5s ease-in-out;
    }

    .icon-1 {
      position: absolute;
      width: 15%;
      top: -2px;
      right: 20px;
      color: #2F5C2F;
      transform-origin: 100% 100%;
      transform: rotate(-55deg) translateX(110%) translateY(5%);
      z-index: -2;
      transition: all 0.5s;
    }

    &:hover .icon-1 {
      width: 25%;
      transform: rotate(15deg) translateX(110%) translateY(-40%);
    }

    .icon-2 {
      position: absolute;
      width: 15%;
      top: 20px;
      left: 10px;
      color: #2F5C2F;
      transform-origin: 100% 100%;
      z-index: -2;
      transition: all 0.5s;
    }

    &:hover .icon-2 {
      width: 50%;
      top: -50px;
      left: -80px;
      transform: rotate(70deg);
      z-index: 1;
    }
  }


}

.leaf-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vh;
  height: 100%;
  z-index: 0;

  .leaf {
    position: fixed;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    background-size: contain;
    background-repeat: no-repeat;
    animation: fadeIn 9s forwards;
    opacity: 0;
    background-color: transparent;
    

    &.leaf2 {
      top: 200px;
      left: 5%;
      transform: translatey(30px) rotate(30deg) translatey(-1);
      animation: fadeIn 9s forwards, leafMovement2 3s infinite alternate 0.4s;
      background-image: url(../assets/img/leaf2.png);
      background-size: contain;

    }

    &.leaf3 {
      top: 100px;
      left: -8%;
      transform:  scale(4);
      animation: fadeIn 9s forwards, leafMovement3 3s infinite alternate 0.3s;
      background-image: url(../assets/img/leaf2.png);
      background-size: contain;
  
    }

    &.leaf4 {
      top: 500px;
      left : 800px;
      transform: translateX(-800px)  scale(2)  ;
      animation: fadeIn 12s forwards, leafMovement4 30s infinite alternate 2s;
      background-image: url(../assets/img/leaf4.png);
    }

    &.leaf5 {
      bottom: 200px;
      left: 80%;
      transform:   scale(2) ;
      animation: fadeIn 8s forwards, leafMovement5 20s infinite alternate 1s;
      background-image: url(../assets/img/leaf4.png);
    }
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
 
  }
  100% {
    opacity: 1;
   
  }
}

@keyframes stroke {
  0% {
    fill: rgba(89, 89, 88, 0);
    stroke: rgba(64, 64, 63, 1);
    stroke-dashoffset: 25%;
    stroke-dasharray: 0 50%;
    stroke-width: 2;
  }

  70% {
    fill: rgba(89, 89, 88, 0);
    stroke: rgba(64, 64, 63, 1);
  }

  80% {
    fill: rgba(89, 89, 88, 0);
    stroke: rgba(64, 64, 63, 1);
    stroke-width: 3;
  }

  100% {
    fill: rgba(89, 89, 88, 1);
    stroke: rgba(64, 64, 63, 0.128);
    stroke-dashoffset: -25%;
    stroke-dasharray: 50% 0;
    stroke-width: 0;
  }
}

@keyframes bg {

  0%, 100% {
    background-color: $lightgray;
  }

  25% {
    background-color: $lightgray;
  }

  50% {
    background-color: $beige;
  }

  75% {
    background-color: $lightpink;
  }
}

@keyframes leafMovement2 {
  0% {
    transform: translateY(0);
  }
  9% {
    transform: translateY(-5px);
  }
  100% {
    transform: translateY(0);
  }
}
@keyframes leafMovement3 {
  0% {
    transform: scale(1);
  }
  50% {
    transform: translate(-10px);
  }
  100% {
    transform: translateY(0) scaleY(1);
  }
}

@keyframes leafMovement4 {
  0% {
    transform:  scale(4) rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateX(200px);
  }
 
  100% {
    transform: translatey(30px), scale(2);
  }
}
</style>
