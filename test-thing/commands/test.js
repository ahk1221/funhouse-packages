'use strict';

module.exports = ({ Command, manager }) => {
    manager.category('test', 'yum very taste')
      .add(new Command('setdim')
       .parameter('dimension', 'number', 'the dimension lololollol')
       .handler((player, dimension) => {
            player.dimension = dimension;
       }))

      .add(new Command('creatCheckpoint')
       .handler((player) => {
            jcmp.events.CallRemote('create_checkpoint', player);
       }));
};