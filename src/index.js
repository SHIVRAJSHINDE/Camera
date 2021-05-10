import './style/main.css'
import * as THREE from 'three'
import { Clock, MeshToonMaterial } from 'three'
import gsap from 'gsap'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'


console.log(OrbitControls)
//cursor

const cursor = {x:0,y:0}

window.addEventListener('mousemove',(event) => 
{
    cursor.x = event.clientX / sizes.width -0.5
    cursor.y = - (event.clientY / sizes.height -0.5)
    console.log(cursor.x)
})

//sizes
const sizes = {
    width : 800,
    height : 600,

}

// scene
const scene = new THREE.Scene()

//Object
const geometry = new THREE.BoxGeometry(1,1,1,5,5,5)
const material = new THREE.MeshBasicMaterial({color:0xff0000})
const mesh = new THREE.Mesh(geometry,material)

scene.add(mesh)




//camera
const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,.1,100)
//const aspectRation = sizes.width / sizes.height
//const camera = new THREE.OrthographicCamera(-1*aspectRation,1*aspectRation,1,-1,0.1,100)
//camera.position.x = 2
//camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)



//Renderer
const canvas = document.querySelector('.webgl')
//console.log(canvas)
const renderer = new THREE.WebGLRenderer({canvas:document.querySelector('canvas.webgl')})
renderer.setSize = (sizes.width,sizes.height)
renderer.render(scene,camera) 

const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.target.y = 2
controls.update()

const clock = new THREE.Clock()
//gsap.to(mesh.position,{duration:1, delay:1, x:2})
//gsap.to(mesh.position,{duration:1, delay:1, y:2})


const tick = () =>
{


    //const elapsedTime = clock.getElapsedTime()

    //Update camera
    camera.position.x = Math.sin(cursor.x * Math.PI *2)*3
    camera.position.z = Math.cos(cursor.x * Math.PI *2)*3
    camera.position.y = cursor.y *8

    camera.lookAt(mesh.position)

    //mesh.rotation.y = elapsedTime
    renderer.render(scene,camera)
    window.requestAnimationFrame(tick)
}

tick()
