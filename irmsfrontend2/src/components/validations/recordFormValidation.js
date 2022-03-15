import { validationMixin } from 'vuelidate'
import { required, maxLength, minLength, integer, decimal } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    validations: {
        item: {
            return_id: { required, integer },
            order_id: { required, integer },
            operation_date: { required },
            customer_name: { required },
            customer_surname: { required },
            customer_PID: { required },
            customer_account: { required, minLength: minLength(20), maxLength: maxLength(32) },
            amount: { required, decimal },
            payment_details: { required },
        }
    },
    data: () => ({
        valid: false, 
        item: {},
    }),
    computed: {
        returnIDErrors () {
          const errors = []
          if (!this.$v.item.return_id.$dirty) return errors
          !this.$v.item.return_id.required && errors.push('Return ID is required.')
          !this.$v.item.return_id.integer && errors.push('Return ID must be a number.')
          return errors
          },
          orderIDErrors () {
          const errors = []
          if (!this.$v.item.order_id.$dirty) return errors
          !this.$v.item.order_id.required && errors.push('Order ID is required.')
          !this.$v.item.order_id.integer && errors.push('Return ID must be a number.')
          return errors
          },
          operationDateErrors () {
          const errors = []
          if (!this.$v.item.operation_date.$dirty) return errors
          !this.$v.item.operation_date.required && errors.push('Operation date is required.')
          return errors
          },
          customerNameErrors () {
          const errors = []
          if (!this.$v.item.customer_name.$dirty) return errors
          !this.$v.item.customer_name.required && errors.push('Name is required.')
          return errors
          },
          customerSurnameErrors () {
          const errors = []
          if (!this.$v.item.customer_surname.$dirty) return errors
          !this.$v.item.customer_surname.required && errors.push('Surname is required.')
          return errors
          },
          customerPIDErrors () {
          const errors = []
          if (!this.$v.item.customer_PID.$dirty) return errors
          !this.$v.item.customer_PID.required && errors.push('Customer PID is required.')
          return errors
          },
          customerAccountErrors () {
          const errors = []
          if (!this.$v.item.customer_account.$dirty) return errors
          !this.$v.item.customer_account.maxLength && errors.push('Account number may have up to 30 characters long')
          !this.$v.item.customer_account.minLength && errors.push('Account number must be at least 20 characters long')
          !this.$v.item.customer_account.required && errors.push('Order ID is required.')
          return errors
          },
          amountErrors () {
          const errors = []
          if (!this.$v.item.amount.$dirty) return errors
          !this.$v.item.amount.required && errors.push('Please, enter return amount.')
          !this.$v.item.amount.decimal && errors.push('Amount must be a number.')
          return errors
          },
          paymentDetailsErrors () {
          const errors = []
          if (!this.$v.item.payment_details.$dirty) return errors
          !this.$v.item.payment_details.required && errors.push('Payment details is required.')
          return errors
          },
      },
  }