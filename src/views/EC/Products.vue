<template>
  <LoadingOverlay :active="isLoading"></LoadingOverlay>
  <div>
    <div class="text-end">
      <button class="btn btn-primary " type="button" @click="openModal(true)"> 增加一個產品</button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="200">編輯</th>
        </tr>
      </thead>
      <tbody>

        <tr v-for="item in products" :key="item.id">

          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">
            {{ $filters.currency(item.origin_price) }}
          </td>
          <td class="text-right">
            {{ $filters.currency(item.price) }}
          </td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-muted" v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button class="btn btn-outline-primary btn-sm" @click="openModal(false, item)">編輯</button>
              <button class="btn btn-outline-danger btn-sm" @click="openDelModal(item)">刪除</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <Pagination :pages="pagination" @emit-pages="getProducts"></Pagination>
  <ProductModal ref="productModal" :product="tempProduct" @update-product="updateProduct"></ProductModal>
  <DelModal ref="delModal" :item="tempProduct" @del-item="deleteProduct"></DelModal>

</template>


<script>
import ProductModal from "@/components/EC/ProductModal.vue";
import DelModal from "@/components/EC/DelModal.vue";
import {adminProductApi} from '@/utils/path'
import Pagination from '@/components/Base/Pagination.vue';
export default {
  components: {ProductModal, DelModal, Pagination, },
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
    }
  },
  inject: ['emitter'],
  methods: {

    getProducts(page = 1) {
      const url = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/products?page=${page}`
      this.isLoading = true;
      this.axios.get(url).then((response) => {
        this.isLoading = false;
        if (response.data.success) {
          //console.log(response.data)
          this.products = response.data.products;
          this.pagination = response.data.pagination;
        }

      })
    },
    openModal(isNew, item) {
      console.log(isNew, item)
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = {...item};
      }
      this.isNew = isNew;
      const productModal = this.$refs.productModal;
      productModal.showModal();
    },
    openDelModal(item) {

      this.tempProduct = {...item};
      const delModal = this.$refs.delModal;
      console.log(this.$refs)
      console.log(delModal)
      delModal.showModal();
    },
    updateProduct(item) {

      this.tempProduct = item;
      let api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/product`;
      let httpMethod = 'post';
      if (!this.isNew) {
        api = `${import.meta.env.VITE_API}api/${import.meta.env.VITE_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }
      const productComponent = this.$refs.productModal;
      this.$http[httpMethod](api, {data: this.tempProduct}).then((response) => {

        productComponent.hideModal();
        if (response.data.success) {
          this.getProducts();
          this.emitter.emit('push-message', {
            style: 'success',
            title: '更新成功',
          });
        } else {
          this.emitter.emit('push-message', {
            style: 'danger',
            title: '更新失敗',
            content: response.data.message.join('、'),
          });
        }
      });

    },
    deleteProduct() {

      let api = `${adminProductApi}/${this.tempProduct.id}`;
      this.$http.delete(api).then((response) => {
        console.log(response.data);
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getProducts();
      });

    }

  },
  created() {
    this.getProducts();
  },
}

</script>@/utils/config