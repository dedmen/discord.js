'use strict';

const { Events, Status } = require('../../../util/Constants');

module.exports = (client, { d: data }, shard) => {
  const guild = client.guilds.get(data.id);
  console.log("sync", data);
  if (guild) {
      if (data.presences) {
        for (const presence of data.presences) guild.presences.add(presence);
      }

      if (data.members) {
        for (const syncMember of data.members) {
          const member = guild.members.get(syncMember.user.id);
          if (member) {
            member._patch(syncMember);
          } else {
            guild.members.add(syncMember, false);
          }
        }
      }

      if ('large' in data) guild.large = data.large;
    };
};
