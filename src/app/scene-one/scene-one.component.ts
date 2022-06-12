import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-scene-one',
  templateUrl: './scene-one.component.html',
  styleUrls: ['./scene-one.component.scss'],
})
export class SceneOneComponent implements AfterViewInit {

  @ViewChild('canvas') private canvasRef:  ElementRef<HTMLCanvasElement>;

  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }

  scene;
  camera;
  renderer;
  frameId;
  box;

  constructor() { }

  ngAfterViewInit() {

    // Scene setup
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xaaaaaa);

    // Object in scene
    let geometry = new THREE.BoxGeometry(1, 1, 1);
    let material = new THREE.MeshStandardMaterial({color: new THREE.Color('skyblue')})
    this.box = new THREE.Mesh(geometry, material);
    this.scene.add(this.box);

    // Light
    let light = new THREE.DirectionalLight();
    light.position.set(0, 1, 2);
    this.scene.add(light);

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 0.1, 1000
    );
    this.camera.position.z = 5;
    this.scene.add(this.camera);

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    // Start the rendering process
    this.render();

    // Handle window resize
    window.addEventListener('resize', () => {
      this.resize();
    });
  }

  public render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
    this.box.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }


  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}
