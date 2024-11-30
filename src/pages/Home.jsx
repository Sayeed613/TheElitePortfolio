import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { gsap } from "gsap";

function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      ".heading",
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
      .fromTo(
        ".bio",
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 1, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(
        ".cta",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
      );

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.01,
      100
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.outputEncoding = THREE.sRGBEncoding;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const rgbeLoader = new RGBELoader();
    rgbeLoader.load(
      "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/satara_night_1k.hdr",
      (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
      },
      undefined,
      (error) => {
        console.error("Error loading HDR texture:", error);
      }
    );

    const loader = new GLTFLoader();
    let spaceObject = null;

    loader.load(
      "/model/scene.gltf",
      (gltf) => {
        if (spaceObject) return;
        spaceObject = gltf.scene;
        spaceObject.scale.set(0.5, 0.5, 0.5);
        spaceObject.position.set(0, 0, 0);
        scene.add(spaceObject);
      },
      undefined,
      (error) => {
        console.error("Error loading GLTF model:", error);
      }
    );

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(
      new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.8,
        0.3,
        0.85
      )
    );

    const clock = new THREE.Clock();
    const animate = () => {
      // Removed unused 'elapsedTime' variable
      if (spaceObject) {
        spaceObject.rotation.z += 0.010;
      }

      composer.render();
      requestAnimationFrame(animate);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      composer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id="home" className="relative w-full h-screen overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      />
      <div className="absolute top-0 left-4 sm:left-[200px] p-10 text-white z-20">
        <h1 className="heading text-5xl sm:text-7xl md:text-8xl font-bold leading-tight">
          Mern <br /> Developer.
        </h1>
      </div>

      <div className="absolute bottom-[30%] sm:bottom-[300px] right-8 sm:right-20 text-[#ADADAD] w-[80%] sm:w-[30%] text-start z-20">
        <p className="bio text-sm sm:text-base md:text-lg">
          Hi, I&apos;m <b className="text-white font-light">Sayeed Ahmed</b>, based in KGF, a <br />
          <b className="text-white font-light">MERN stack developer</b> and{" "}
          <b className="text-white font-light">Creative Developer</b>.
        </p>
        <br />
        <p className="bio w-full sm:w-[80%] text-sm sm:text-base md:text-lg">
          I’m passionate about coding, creative development, and crafting impactful
          digital solutions. I enjoy continuous learning, staying updated with tech trends, and listening to inspiring podcasts.
        </p>
        <br />
        <p className="cta text-white font-light text-sm sm:text-base md:text-lg">
          Let’s connect and innovate together!
        </p>
      </div>
    </div>
  );
}

export default Home;
