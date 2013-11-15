var renderer, scene, camera, mesh, controls, stats;

var projector, mouse = { x: 0, y: 0 }, INTERSECTED;
var mouseSprite;

var clock = new THREE.Clock();



function initScene3D(){

    // RENDERER
    if ( Detector.webgl )
    {
        renderer = new THREE.WebGLRenderer();
    }
    else
    {
        renderer = new THREE.CanvasRenderer();
    }

    renderer.setSize( sceneWidth, sceneHeight );
    document.getElementById('container').appendChild(renderer.domElement);

    // SCENE
    scene = new THREE.Scene();

    // CAMERA
    camera = new THREE.PerspectiveCamera(50, sceneWidth / sceneHeight, 1, 10000 );
    camera.position.set(0, 150, 500);
    scene.add(camera);

    // FLOOR
    var floorTexture = new THREE.ImageUtils.loadTexture( 'images/dev/floor.jpg' );
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set( 5, 5 );
    var floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
    var floorGeometry = new THREE.PlaneGeometry(4000, 1000, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);


    // STATS
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.zIndex = 100;
    container.appendChild( stats.domElement );

    // EVENTS
    THREEx.WindowResize(renderer, camera);
    THREEx.FullScreen.bindKey({ charCode : 'm'.charCodeAt(0) });

    // initialize object to perform world/screen calculations
    projector = new THREE.Projector();

    // CUBE
    var geometry = new THREE.CubeGeometry( 200, 200, 200 );
    var material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );
    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );
    mesh.position.y = 100;


    // CURSOR
    // when the mouse moves, call the given function
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    var mouseTexture = THREE.ImageUtils.loadTexture( 'images/gui/cursor.png' );
    var mouseMaterial = new THREE.SpriteMaterial( { map: mouseTexture, useScreenCoordinates: true, alignment: THREE.SpriteAlignment.topLeft } );
    mouseSprite = new THREE.Sprite( mouseMaterial );
    mouseSprite.scale.set( 32, 32, 1.0 );
    mouseSprite.position.set( -1000, -1000, 0 );
    scene.add( mouseSprite );


    // RENDER
    renderer.render( scene, camera );

    // ANIMATION
    animate();
}

function onDocumentMouseMove( event )
{
    // CURSOR
    mouseSprite.position.set( event.clientX, event.clientY, 0 );
}

function animate()
{
    requestAnimationFrame( animate );
    render();
    update();
}

function update()
{
    stats.update();
}

function render()
{
    renderer.render( scene, camera );
}
