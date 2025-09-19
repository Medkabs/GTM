"use client";

import React, { useEffect, useRef } from "react";
import "./BeALight.css";

const BeALight: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headingRef.current) return;

    const resolver = {
      resolve: function (options: any, callback?: () => void) {
        const resolveString = options.resolveString || options.element.getAttribute("data-target-resolver");
        const combinedOptions = { ...options, resolveString };

        function getRandomInteger(min: number, max: number) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function randomCharacter(characters: string[]) {
          return characters[getRandomInteger(0, characters.length - 1)];
        }

        function doRandomiserEffect(options: any, callback?: () => void) {
          let { iterations, partialString, element, characters, timeout } = options;

          setTimeout(() => {
            if (iterations >= 0) {
              const nextOptions = { ...options, iterations: iterations - 1 };

              if (iterations === 0) {
                element.textContent = partialString;
              } else {
                element.textContent =
                  partialString.substring(0, partialString.length - 1) +
                  randomCharacter(characters);
              }

              doRandomiserEffect(nextOptions, callback);
            } else if (callback) {
              callback();
            }
          }, timeout);
        }

        function doResolverEffect(options: any, callback?: () => void) {
          const { resolveString, characters, offset } = options;
          const partialString = resolveString.substring(0, offset);
          const combinedOptions = { ...options, partialString };

          doRandomiserEffect(combinedOptions, () => {
            const nextOptions = { ...options, offset: offset + 1 };
            if (offset <= resolveString.length) {
              doResolverEffect(nextOptions, callback);
            } else if (callback) callback();
          });
        }

        doResolverEffect(combinedOptions, callback);
      },
    };

    const strings = [
      "BE A LIGHT",
      "FOR GOD",
      "BE A LIGHT",
    ];

    let counter = 0;

    const options = {
      offset: 0,
      timeout: 30,
      iterations: 10,
      characters: [
        "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","x","y","z","#","%","&","-","+","_","?","/","\\","="
      ],
      resolveString: strings[counter],
      element: headingRef.current,
    };

    function callback() {
      setTimeout(() => {
        counter++;
        if (counter >= strings.length) counter = 0;
        const nextOptions = { ...options, resolveString: strings[counter], offset: 0 };
        resolver.resolve(nextOptions, callback);
      }, 1000);
    }

    resolver.resolve(options, callback);
  }, []);

  return (
    <div className="container">
      <h1 className="heading" ref={headingRef} data-target-resolver></h1>
    </div>
  );
};

export default BeALight;
