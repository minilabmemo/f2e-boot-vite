import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ProductModal from '../EC/ProductModal.vue'

describe('ProductModal', () => {
  it('renders properly', () => {
    const wrapper = mount(ProductModal, { props: { product: {"id":"123","title":"product1"}} })
    expect(wrapper.text()).toContain('新增產品')
    expect(wrapper.text()).toContain('標題')
    // expect(wrapper.emitted().showModal).toBeTruthy()

    //show modal and get title how ? 
    // const input = wrapper.find('input#title')
    // expect(input.element.value).toBe('product1') get ''
  })
})
