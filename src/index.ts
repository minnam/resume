import { createServer } from 'http'
import { readFileSync } from 'fs'


const host = 'localhost';
const port = 8000;


const resume = {
  profile: {
    name: 'Min Nam',
    job: 'Full Stack Developer',
    description: 'A full-stack developer with 3+ years of experience writing responsive web applications for a broad range of industries. Specialized in Node.js and its widely used libraries and frameworks.',
  },
  contacts: {
    phone: '778 989 2385',
    email: 'hi@minnam.io',
    address: 'Burnaby, BC, Canada'
  },
  links: [
    {
      name: 'Github',
      url: 'https://github.com/minnam',
    }
  ],
  skills: [
    {
      name: 'Github',
      url: 'https://github.com/minnam',
    }
  ],
  education: [
    {
      school: 'BCIT',
      program: "Bachelor's Degree in CST",
      description: 'Human Computer Interface Option',
      from: 'Jan 2018',
      to: 'Current'
    },
    {
      school: 'BCIT',
      program: 'Diploma in CST',
      from: 'May 2012',
      to: 'Jan 2016'
    }
  ]
}

const requestListener = function (req: any, res: any) {
  res.writeHead(200)
  const educationTemplate = readFileSync( `${__dirname}/template/education.html`, 'utf8')
  const mainTemplate = readFileSync( `${__dirname}/template/main.html`, 'utf8')
    .replace('{{profile.name}}', resume.profile.name)
    .replace('{{profile.job}}', resume.profile.job)
    .replace('{{profile.description}}', resume.profile.description)
    .replace('{{education}}', (() => {
      let education = ''

      resume.education.map((item) => {
        education += `${educationTemplate}`
          .replace('{{school}}', item.school)
          .replace('{{program}}', item.program)
          .replace('{{description}}', item.description || '')
          .replace('{{from}}', item.from)
          .replace('{{to}}', item.to)
      })

      return education
    })())

  res.end(mainTemplate)
};

const server = createServer(requestListener)
server.listen(port, host, () => {
    console.log(`Resume is served on http://${host}:${port}`)
});