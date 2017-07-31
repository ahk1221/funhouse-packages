'use strict';

var vehicle;

module.exports = ({ Command, manager }) => {
  manager.category('vehicle', 'vehicle commands')
    .add(new Command(['color', 'colour'])
      .parameter('colour', 'number', 'vehicle colour')
      .description('changes your vehicle colour')
      .handler((player, colour) => {
        if (typeof player.vehicle === 'undefined') {
          freeroam.chat.send(player, 'You must be in a vehicle to use this command.', freeroam.config.colours.command_fail);
          return;
        }

        freeroam.chat.send(player, `Setting your vehicles colour to ${colour}.`, freeroam.config.colours.command_success);
        player.vehicle.primaryColor = colour;
    }))

    .add(new Command('set_vehicle')
      .description('Sets the vehicle to explode.')
      .handler(player =>
      {
          vehicle = player.vehicle;
      }))

    .add(new Command('explode')
      .description('Explodes the vehicle you are in')
      .handler(player => {
          vehicle.health = 0;
          vehicle.position = new Vector3f(vehicle.position.x, vehicle.position.y + 0.2, vehicle.position.z);
          freeroam.chat.send(player, 'This is a not, ok?', freeroam.config.colours.command_success);
      }));
};
