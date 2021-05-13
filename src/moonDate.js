/*
*日历及时间类
*/

import './style/mdate.scss'

class moonDate {

  constructor(opts = {}) {
    if(opts.dom) {
      this._elem = document.querySelector(opts.dom);
    } else {
      this._elem = document.createElement('div');
      document.body.appendChild(this._elem);
    }
    this._elem.onclick = this.onClick.bind(this);
    this.format = opts.format;
    this.activeDate = this.getDate(this.format);
    this.init();
  }

  init(){
    this.getAllDate();
    this.renderDom();
  }
    
  templateDom() {
    let allDisplayDate = this.getAllDate();
    let template = `
<div class="mDate-wrapper">
  <div class="mDate-header">
    <a class="mDate-header-btns preyear" data-action="changeYear('pre')"><<</a>
    <a class="mDate-header-btns nextyear" data-action="changeYear('next')">>></a>
    <a class="mDate-header-btns premonth" data-action="changeMonth('pre')"><</a>
    <a class="mDate-header-btns nextmonth" data-action="changeMonth('next')">></a>
    <div class="mDate-header-title">
      <span class="mDate-month-btn">${this.activeDate.month+1}月</span>
      <span class="mDate-year-btn">${this.activeDate.year}年</span> 
    </div>
  </div>
  <div class="mDate-body">
    <table>
      <thead>
        <tr>
          <th>日</th>
          <th>一</th>
          <th>二</th>
          <th>三</th>
          <th>四</th>
          <th>五</th>
          <th>六</th>
        </tr>
      </thead>
      <tbody>
        <tr>`
    for(let i=0; i<42; i++){
      let data = allDisplayDate[i];
      if(data.active && data.date == this.activeDate.date) {
        template += `
          <td class="normal active">${data.date}</td>`
      } else if (data.active) {
        template += `
          <td class="normal">${data.date}</td>`
      } else {
        template += `
          <td class="unnormal">${data.date}</td>`
      }
      if((i+1)%7==0 && i!=41) {
        template += `
        </tr><tr>`
      }
    }
    template += `
        </tr>
      </tbody>
    </table>
  </div>
  <div class="mDate-footer"></div>
</div>`
    return template;
  }

  renderDom() {
    this._elem.innerHTML = this.templateDom();

    // 方法二：字符串转为node节点
    // let node = new DOMParser().parseFromString(template,'text/html').querySelector('.mDate-wrapper');
    // this._elem.appendChild(node);   
  }

  //获取年月日信息
  getDate(format) {
    let day = format? new Date(format) : new Date();
    let dayYear = day.getFullYear();
    let dayMonth = day.getMonth();
    let dayDate = day.getDate();
    let dayDay = day.getDay();

    return {
      year:dayYear,
      month:dayMonth,
      date:dayDate,
      day:dayDay
    }
  }

  getAllDate() {
    //当前日历展示所有日期信息，42个
    let allDisplayDate = [];
    //当前年份
    let acYear = this.activeDate.year;
    //当前月份
    let acMonth = this.activeDate.month;
    //本月第一天
    let firstDate = new Date(acYear, acMonth, 1);
    //本月最后一天
    let lastDate = new Date(acYear, acMonth+1, 0);
    //本月天数
    let acDays = lastDate.getDate();

    let firstDateDay = firstDate.getDay();
    for(let i=0; i<firstDateDay; i++){
      let tempDate = new Date(this.activeDate.year, this.activeDate.month, -i)
      allDisplayDate.unshift({
        year: tempDate.getFullYear(),
        month: tempDate.getMonth(),
        date: tempDate.getDate(),
        active:false
      })
    }
    for(let i=0; i<acDays; i++){
      allDisplayDate.push({
        year: acYear,
        month: acMonth,
        date: i+1,
        active:true
      })
    }
    while(allDisplayDate.length<42){
      let last = allDisplayDate[allDisplayDate.length-1]; 
      let tempDate = new Date(last.year, last.month, last.date+1);
      allDisplayDate.push({
        year: tempDate.getFullYear(),
        month: tempDate.getMonth(),
        date: tempDate.getDate(),
        active:false
      })
    }
    return allDisplayDate;
  }

  //补齐weishu
  twoDigit(num){
    return num<10? '0'+(num || 0) : num;
  }

  //event
  onClick(event) {
    let action = event.target.dataset.action;
    if (action) {
      let actionName = action.split('(').[0];
      let actionPara = action.split('(').[1].replace(/[)\']/g,'');
      this[actionName](actionPara);
    }
  };
  /*
  *切换年份
  *type = 'next/pre'
  */
  changeYear(type) {
    if(type == 'next') {
      this.activeDate.year += 1;
    } else {
      this.activeDate.year += -1;
    }
    this.getAllDate();
    this.renderDom();
  }
  //切换月份
  changeMonth(type) {
    if(type == 'next') {
      if(this.activeDate.month == 11) {
        this.activeDate.month = 0;
        this.activeDate.year++;
      } else {
        this.activeDate.month++;
      }
    } else {
      if(this.activeDate.month == 0) {
        this.activeDate.month = 11;
        this.activeDate.year--;
      } else {
        this.activeDate.month--;
      }
    }
    this.getAllDate();
    this.renderDom();
  }

  //点击日期
  clickDay() {

  }
}

export default moonDate


