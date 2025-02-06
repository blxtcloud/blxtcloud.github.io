    document.addEventListener('DOMContentLoaded', function() {
        fetch('https://v1.hitokoto.cn')
            .then(response => response.json())
            .then(data => {
                document.getElementById('hitokoto').innerText = data.hitokoto;
            })
            .catch(error => {
                console.error('Error fetching hitokoto:', error);
                document.getElementById('hitokoto').innerText = '加载失败，请稍后再试。';
            });
    });
    document.addEventListener('DOMContentLoaded', function() {
        fetch('https://v1.jinrishici.com/all.json')
            .then(response => response.json())
            .then(data => {
                document.getElementById('poem').innerText = data.content;
            })
            .catch(error => {
                console.error('Error fetching poem:', error);
                document.getElementById('poem').innerText = '加载失败，请稍后再试。';
            });
    });

    
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('pieChart'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '文章分类统计',
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        //- legend: {
        //-     orient: 'vertical',
        //-     left: 'left'
        //- },
        series: [
            {
                name: '文章数',
                type: 'pie',
                radius: '50%',
                data: [],
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    if (window.innerWidth <= 1024 ){    
        window.addEventListener('resize', function() {
            myChart.resize();
        });
    }else{
        myChart.resize({
            width: '430px',
            height: '380px'
        });
    }
    // 鼠标点击样式
    myChart.on('click', function(params) {
        window.open( weburl + '/categories/' + encodeURIComponent(params.name));
      });
    // 传入数据
    option.series[0].data = categories;
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

     // 折线图
    var lineChart = echarts.init(document.getElementById('lineChart'));
    var lineOption = {
        title: {
            text: '文章发布统计',
            left: 'center'
        },    
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: []
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            name: '文章数', 
            data: [],
            type: 'bar',
            label: {
                show: true,
                position: 'top'
            },
            itemStyle:{
                color: function(params) {
                    var colorList = ['#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'];
                    return colorList[params.dataIndex];
                }
            }
        }]
    };
    if (window.innerWidth <= 1024 ){
        window.addEventListener('resize', function() {
            lineChart.resize();
        });
    }else{
        lineChart.resize({
            width: '400px',
            height: '340px'
        });
    }
    // 鼠标点击样式
    lineChart.on('click', 'series', function(params) {
        window.open( weburl + '/archives/' + encodeURIComponent(params.name));
      });
    // 传入数据
    lineOption.xAxis.data = posts.map(post => post.year);
    lineOption.series[0].data = posts.map(post => post.count);
    // 使用刚指定的配置项和数据显示图表。
    lineChart.setOption(lineOption);
    