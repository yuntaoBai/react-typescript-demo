const proxy = {
    'GET /api/search/:keyword': (req, res) => {
        const { keyword } = req.params
        if (keyword.length > 6) {
            return res.json({
                code: 0,
                data: [],
                success: true
            })
        }
        return res.json({
            code: 0,
            data: [
                {
                    title: '分类-1',
                    children: [
                        {
                            title: '分类-1-子标题-1' + keyword,
                            info: '分类1--子info-1' + keyword,
                            price: 123
                        },
                        { 
                            title: '分类-1-子标题-2' + keyword,
                            info: '分类-1-子info-2' + keyword,
                            price: 234.43
                        }
                    ]
                },
                {
                    title: '分类-2',
                    children: [
                        {
                            title: '分类-2-子标题-1' + keyword,
                            info: '分类2--子info-1' + keyword,
                            price: 123
                        },
                        {
                            title: '分类-2-子标题-2' + keyword,
                            info: '分类-2-子info-2' + keyword,
                            price: 234.43
                        }
                    ]
                }
            ],
            success: true
        })
    }
}
module.exports = proxy