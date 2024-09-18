const mongooge = require('mongoose')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongooge.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: [true, 'User email required'],
    validate: {
      validator: async function (email) {
        const user = await this.constructor.findOne({ email })
        if (user) {
          if (user.id === this.id) return true
          return false
        }
        return true
      },
      message: (props) => `Email address ${props.value} is already registered.`,
    },
  },
  password: {
    type: String,
    required: true,
  },
})

userSchema.methods.generateAuthToken = function (options) {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    config.get('jwtPrivateKey'),
    options
  )
  return token
}

const User = mongooge.model('User', userSchema)

const validate = (user) => {
  const schema = Joi.object({
    name: Joi.string().required().trim(),
    email: Joi.string().required().email().trim(),
    password: Joi.string()
      .required()
      .trim()
      .regex(
        new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/
        )
      )
      .message('Password does not satisfy the policy requirements'),
  })

  return schema.validate(user)
}

exports.User = User
exports.validate = validate
