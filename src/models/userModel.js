const { Schema, model } = require('mongoose');
const userSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      match:
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
      type: String
    },
    role: {
      type: String,
      default: 'USER',
      enum: ['USER', 'ADMIN']
    },
    google: {
      type: String
    },

    profile: {
      name: {
        type: String,
        require: true,
        trim: true
      },
      mobile: {
        type: Object
      },
      address: {
        type: String
      },
      avatar: {
        type: String,
        default:
          'https://res.cloudinary.com/dbdb4punq/image/upload/v1619375333/test/depositphotos_309156466-stock-illustration-male-face-avatars-man-silhouette_ekgi4z.jpg'
      }
    }
  },
  {
    timestamps: true
  }
);
module.exports = model('User', userSchema);
