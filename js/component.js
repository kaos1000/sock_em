AFRAME.registerComponent('hello-world', {
    init: function () {
			var enclosure;

			//Get the enclosure
			altspace.getEnclosure().then(function(e) {
				enclosure = e;
				//Connect to sync server
				//altspace.utilities.sync.connect(config).then(function(connection) {
					//Retrieve SceneSync
					//sceneSync = new altspace.utilities.behaviors.SceneSync(connection.instance, {
						//instantiators: {'Cube': createCube },//Create the cube
						//ready: ready//Ready!
					//});
					//Add SceneSync to the scene
					//sim.scene.addBehavior(sceneSync);

				//});
					//var cb = createCube();
					//ready(cb);			
			});

      var scene_obj = document.querySelector('a-scene').object3D;
      //Create cube
      var cubeSize = 4;
      var geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
      var material = new THREE.MeshBasicMaterial({color:'green'});
      var cube = new THREE.Mesh(geometry, material);
      //Bring the cube down closer to the user
      cube.position.y = 1;
      
      //Add behaviors
      cube.addBehaviors(
        //new altspace.utilities.behaviors.Object3DSync({position: true}),
        new altspace.utilities.behaviors.Drag({
          //Limit drag to within bounds of the enclosure
          x: { min: (4 / 3) * -1, max: (4 / 3)},
          z: { min: (4 / 3) * -1, max: (4 / 3)}
        })
      );
      //Add event listeners
      cube.addEventListener('dragstart', function (data) {
        cube.material.color.setStyle('blue');
      });
      //Add 'Drag Stop' event listener
      cube.addEventListener('dragstop', function (data) {
        cube.material.color.setStyle('red');
      });

      scene_obj.add(cube);
    }
  });