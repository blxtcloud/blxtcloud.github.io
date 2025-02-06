// downloads.js
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.flink-tab');
    const contents = document.querySelectorAll('.flink-content');

    // 定义颜色池
    const colorPool = ['#F9EBEA', '#F5EEF8', '#D5F5E3', '#E8F8F5', '#FEF9E7', '#F8F9F9', '#82E0AA', '#D7BDE2', '#A3E4D7', '#85C1E9'];

    // 用于存储已分配的颜色，确保每个 class_name 的颜色唯一
    const usedColors = new Set();

    // 定义“全部”的颜色
    const allTab = document.querySelector('.flink-tab[data-class="all"]');
    const allColor = 'rgb(80 167 225)'; // 示例颜色
    allTab.style.backgroundColor = allColor;
    usedColors.add(allColor);

    // 默认显示所有内容
    contents.forEach(content => {
        content.classList.add('active');
    });

    // 默认选中“全部”标签
    allTab.classList.add('active-tab');

    tabs.forEach(tab => {
        const className = tab.getAttribute('data-class');

        if (className !== 'all' && !usedColors.has(className)) {
            // 从颜色池中随机选择一个颜色
            let color;
            do {
                color = colorPool[Math.floor(Math.random() * colorPool.length)];
            } while (usedColors.has(color));

            // 设置颜色
            tab.style.backgroundColor = color;
            usedColors.add(color);
        }

        tab.addEventListener('mouseover', function() {
            // 鼠标上移时只改变背景色
            this.style.backgroundColor = this.style.backgroundColor === allColor ? allColor : color;
        });

        tab.addEventListener('mouseout', function() {
            // 鼠标移出时恢复背景色
            this.style.backgroundColor = this.style.backgroundColor === allColor ? allColor : color;
        });

        tab.addEventListener('click', function() {
            // 移除所有标签的 active-tab 类
            tabs.forEach(t => {
                t.classList.remove('active-tab');
            });

            // 添加当前点击标签的 active-tab 类
            this.classList.add('active-tab');

            // 点击时改变内容
            const className = this.getAttribute('data-class');
            if (className === 'all') {
                // 显示所有内容
                contents.forEach(content => {
                    content.classList.add('active');
                });
            } else {
                // 显示特定内容
                contents.forEach(content => {
                    if (content.getAttribute('data-class') === className) {
                        content.classList.add('active');
                    } else {
                        content.classList.remove('active');
                    }
                });
            }
        });
    });
});