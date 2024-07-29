export default{
    name:'experiences',
    title:'Experiences',
    type: 'document',
    fields:[
        {
            name:'year',
            title:'Year',
            type:'string'
        },
        {
            name:'works',
            title:'Works',
            type:'array',
            of:[{ type:'workExperience'}]
        },
    ],
    orderings: [
        {
          title: 'Date',
          name: 'DateDesc',
          by: [
            {field: 'Year', direction: 'desc'}
          ]
        },
      ]
}