<template>
  <div class="container">
    <table>
      <caption class="heading">
        {{
          message
        }}
      </caption>
      <thead>
        <tr>
          <th scope="col">Account</th>
          <th scope="col">Due Date</th>
          <th scope="col">Amount</th>
          <th scope="col">Period</th>
        </tr>
      </thead>
      <tbody v-for="item in items">
        <tr>
          <td data-label="Account">{{ item.name }}</td>
          <td data-label="Due Date">{{ item.calories }}</td>
          <td data-label="Amount">{{ item.name }}</td>
          <td data-label="Period">{{ item.calories }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          name: "Frozen Yogurt",
          calories: 159,
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
        },
        {
          name: "Eclair",
          calories: 262,
        },
        {
          name: "Cupcake",
          calories: 305,
        },
        {
          name: "Gingerbread",
          calories: 356,
        },
        {
          name: "Jelly bean",
          calories: 375,
        },
        {
          name: "Lollipop",
          calories: 392,
        },
        {
          name: "Honeycomb",
          calories: 408,
        },
        {
          name: "Donut",
          calories: 452,
        },
        {
          name: "KitKat",
          calories: 518,
        },
      ],
      message: "Surveys List",
    };
  },
};
</script>