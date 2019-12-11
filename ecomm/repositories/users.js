const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');
const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async create(attrs) {
    attrs.id = this.randomId();

    const salt = crypto.randomBytes(8).toString('hex');
    const buff = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attrs,
      password: `${buff.toString('hex')}.${salt}`
    };
    records.push(record);
    await this.writeAll(records);
    return record;
  }

  async comparePassword(saved, supplied) {
    // saved - password in our data store
    // supplied - pasword the user entered
    const [hashed, salt] = saved.split('.');
    const buffer = await scrypt(supplied, salt, 64);
    return buffer.toString('hex') === hashed;
  }
}

module.exports = new UsersRepository('users.json');
