export default{
    name:'abouts',
    title:'Abouts',
    type: 'document',
    fields:[
        {
            name:'title',
            title:'Title',
            type:'string'
        },
        {
            name: 'descriptions',
            title: 'Descriptions',
            type:'array',
            of: [
            {
               name:'description',
               title:'Description',
               type:'string'
            }
           ]
          },
        {
            name:'imgUrl',
            title:'ImgUrl',
            type: 'image',
            options: {
              hotspot: true,
            },
        },
        
    ]
}