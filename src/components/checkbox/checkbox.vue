<template>
	<label
		class="v-checkbox"
		:class="[
			{ 'is-bordered': border },
			{'is-checked': isChecked},
		  {'is-disabled': disabled }]">
    <span class="v-checkbox__input"
      :class="[{
        'is-disabled': disabled,
        'is-checked': isChecked
      }]">
      <span class="v-checkbox__inner"></span>
      <input
        class="v-checkbox__original"
        type="checkbox"
        :disabled="disabled"
        :value="label"
        @change="handleChange">
    </span>
		<span class="v-checkbox__label" v-if="$slots.default || label">
      <slot></slot>
      <template v-if="!$slots.default">{{label}}</template>
    </span>
	</label>
</template>

<script>

export default {
	name: "v-checkbox",
	data() {
		return {
      isChecked: false,
      _checkboxGroup: ''
		}
  },
	props: {
		value: {
      type: [Boolean]
    },
    label: {
      type: [String,Number]
    },
    disabled: Boolean,
    checked: Boolean,
    border: Boolean,
	},
	computed: {
		curValue() {
			return this.value;
    },
    isGroup() {
      let parent = this.$parent;
      while (parent) {
        if (parent.$options._componentTag !== 'v-checkbox-group') {
          parent = parent.$parent;
        } else {
          this._checkboxGroup = parent;
          return true;
        }
      }
      return false;
    },
    groupValue() {
			if (this.isGroup) {
				return this._checkboxGroup.value;
			}
			return "";
    }
	},
	methods: {
		initCheck() {
      if (this.isGroup) {
				this.isChecked = this.groupValue.indexOf(this.label) > -1;
			} else if ({}.toString.call(this.curValue) !== '[object Boolean]') {
				throw new Error("单个checkbox的v-model绑定类型为Boolean");
			} else {
				this.isChecked = this.curValue;
			}
		},
		handleChange(e) {
      if (!this.disabled) {
				this.isChecked = !this.isChecked;
				if (this.isGroup) {
          let cVal = this.label
          let gVal = this.groupValue;
					if (this.isChecked) {
						gVal.push(cVal);
					} else {
						let index = gVal.indexOf(cVal);
						gVal.splice(index, 1);
					}
          this.$parent.$emit("input", gVal);
          this.$emit("change", this.isChecked, e)
					this.$parent.$emit("change", this._checkboxGroup.value, e)
				} else {
					this.$emit("input", this.isChecked);
					this.$emit("change", this.isChecked, e)
				}
			}
		}
	},
	created() {
		this.initCheck();
  }
};
</script>

<style lang="scss" scoped>
	.v-checkbox{
    font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    user-select: none;
    font-size: 14px;
    font-weight: 500;
    &.is-bordered{
      box-sizing: border-box;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      padding: 3px 6px;
      line-height: normal;
      &.is-checked{
        border-color: #409eff;
      }
      &.is-disabled{
        border-color: #ebeef5;
      }
    }
    &.is-disabled{
      cursor: not-allowed;
      color: #606266;
    }
    .v-checkbox__label{
      color: #606266;
    }
    .v-checkbox__input{
      white-space: nowrap;
      cursor: pointer;
      outline: none;
      display: inline-block;
      line-height: 1;
      position: relative;
      vertical-align: middle;
      .v-checkbox__inner{
        display: inline-block;
        width: 14px;
        height: 14px;
        box-sizing: border-box;
        border: 1px solid #dcdfe6;
        border-radius: 3px;
        position: relative;
        box-sizing: border-box;
        background-color: #fff;
        // z-index: 20;
        &:hover {
          border-color: #409eff;
        }
      }
      &.is-checked{
        .v-checkbox__inner {
          display: inline-block;
          position: relative;
          display: inline-block;
          position: relative;
          border: 1px solid #409eff;
          border-radius: 3px;
          box-sizing: border-box;
          width: 14px;
          height: 14px;
          background-color: #fff;
          // z-index: 20;
          background-color: #409eff;
          &::after {
            display: inline-block;
            box-sizing: content-box;
            content: "";
            border: 1px solid #fff;
            border-left: 0;
            border-top: 0;
            height: 7px;
            left: 4px;
            position: absolute;
            transform: rotate(45deg) scale(1,1);
            top: 1px;
            width: 3px;
            transition: transform .15s ease-in .05s;
            transform-origin: center;
          }
        }
        & + .v-checkbox__label {
          color: #409eff;
        }
      }
      
      &.is-disabled{
        cursor: not-allowed;
        .v-checkbox__inner{
          display: inline-block;
          position: relative;
          border-radius: 3px;
          width: 14px;
          height: 14px;
          box-sizing: border-box;
          background-color: #edf2fc;
          border: 1px solid #c0c4cc;
        }
        &.is-checked{
          .v-checkbox__inner {
            &::after {
              display: inline-block;
              box-sizing: content-box;
              content: "";
              border: 1px solid #c2c6ce;
              border-left: 0;
              border-top: 0;
              height: 7px;
              left: 4px;
              position: absolute;
              transform: rotate(45deg) scale(1,1);
              top: 1px;
              width: 3px;
              transition: transform .15s ease-in .05s;
              transform-origin: center;
            }
          }
        }
        & + span.v-checkbox__label {
          color: #c0c4cc;
        }
      }
      .v-checkbox__original{
        opacity: 0;
        outline: none;
        position: absolute;
        margin: 0;
        width: 0;
        height: 0;
        z-index: -10;
      }
    }
    .v-checkbox__label{
      display: inline-block;
      padding-left: 2px;
    }
  }
</style>
