const mongoose = require("mongoose")

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('connected', () => console.log('MongoDB connected'))
mongoose.connection.on('error', () => console.log('Failed to connect MongoDB'))

require('@src/user/user.entity')
require('@src/hospital/hospital.entity')
require('@src/country/country.entity')
require('@src/hospitaltype/hospitaltype.entity')
require('@src/department/department.entity')
