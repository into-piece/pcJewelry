
/**
 * 遍历表单数据
 * key 遍历标示
 * value 表单当前数据key名 比如原料编号 key为materialNo
 * noNeed true为非必填 默认必填
 * type ：
 * type 2 下拉选择
 * type 3 点击事件
 * type 4 文字
 * type 5 check
 * type 6 radio
 * type 7 被顺带出的文字
 * type 8 inputext
 * 
 * data：获取model所有的数据 顶层对象
 * list：下拉的数据key名 点击弹窗存入自己页面的model，data[list]可以直接获取到对应下拉数据
 * clickFn： 提供给type为3点击的回调事件
 * text： checkbox的文字
 * arr： Radio.Group的数组
 * form： this.props.form 直接传进来
 * number： InputNumber组件的数字输入  
 * step InputNumber组件的step
 * max：InputNumber组件的max
 * min：InputNumber组件的min
 *  */ 

 
returnElement = ({
  key,
  value,
  noNeed,
  type,
  list,
  clickFn,
  text,
  arr,
  data,
  form,
  number,
  step,
  min,
  max,
}) => {
  switch (type) {
    case 2:
      return (
        <Select
          allowClear
          style={{ width: 180 }}
          placeholder="请选择"
          onChange={v => {
            this.handleSelectChange && this.handleSelectChange(v, value);
          }}
          showSearch
          optionFilterProp="children"
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {data[list] &&
            data[list].length > 0 &&
            data[list].map(({ value, key }) => (
              <Option value={value} key={value}>
                {key}
              </Option>
            ))}
        </Select>
      );
    case 3:
      return (
        <p>
          {form.getFieldValue(value) || ''}
          <span
            style={{ color: '#40a9ff', cursor: 'pointer',marginLeft:10}}
            onClick={() => {
              // 获取原料编号列表
              this.getmaterialNoList()
              this.showMaterialModalFunc(1);
            }}
          >
            选择原料编号
          </span>
        </p>
      );
    case 4:
      return <span>{value || ''}</span>;
    case 5:
      return (
        <Checkbox
          checked={form.getFieldValue(value)}
          onChange={e => {
            this.handleCheckChange(e, value);
          }}
        >
          {text}
        </Checkbox>
      );
    case 6:
      return (
        <Radio.Group>
          {arr.map(({ key, value }) => {
            return (
              <Radio value={value} key={value}>
                {key}
              </Radio>
            );
          })}
        </Radio.Group>
      );
    case 7:
      return <span>{form.getFieldValue(value) || ''}</span>;
    case 8:
      return <TextArea rows={2} placeholder="请输入" />;
    case 9:
      return (
        <RangePicker
          style={{ marginRight: 10 }}
          onChange={(date, dateString) => {
            this.handleDatePicker(date, dateString, value);
          }}
        />
      );
    case 10:
      return (
        <p>
          <span style={{ color: '#40a9ff', cursor: 'pointer' }} onClick={this.addCraft}>
            添加工艺
          </span>
        </p>
      );

    default:
      return number ? (
        <InputNumber
          placeholder="请输入"
          style={{ width: '100%' }}
          step={step}
          min={min}
          max={max}
        />
      ) : (
        <Input placeholder="请输入" />
      );
  }
  //  type === 7 ?
};