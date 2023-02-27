<template>
  <div class="row">
    <div class="col-md-3 col-sm-6 col-12">
      <div class="card bg-primary text-high-emphasis-inverse mb-4">
        <div class="card-body pb-0 d-flex justify-content-between align-items-start">
          <div>
            <div class="fs-4 fw-semibold">2,000</div>
            <div>Total Activations</div>
          </div>
        </div> &nbsp;
      </div>
    </div>
    <div class="col-md-3 col-sm-6 col-12">
      <div class="card bg-primary text-high-emphasis-inverse mb-4">
        <div class="card-body pb-0 d-flex justify-content-between align-items-start">
          <div>
            <div class="fs-4 fw-semibold">43</div>
            <div>Activations Today</div>
          </div>
        </div> &nbsp;
      </div>
    </div>
    <div class="col-md-3 offset-md-3 col-sm-6 col-12">
      <div class="card bg-transparent text-high-emphasis-inverse mb-4" style="border-color: transparent;">
        <div class="card-body pb-0 d-flex justify-content-between align-items-start">
          <div>
            <div class="fs-4 fw-semibold"><button class="btn btn-primary btn-sm sm" type="button">Activate New
                User</button></div>
            <div>
              <div style="text-align: right;">&nbsp;</div>
            </div>
          </div>
        </div> &nbsp;
      </div>
    </div>
  </div>
<!-- <CRow>
    <CCol :xs="12" :sm="6" :md="3">
      <CWidgetStatsA class="mb-4" color="primary">
        <template #value>2,000
        </template>
        <template #title>Total Activations</template>

        <template #chart>
          &nbsp;

        </template>
      </CWidgetStatsA>
    </CCol>
    <CCol :xs="{ cols: 12, offset: 1 }" :sm="{ cols: 6, offset: 1 }" :md="3">
      <CWidgetStatsA class="mb-4" color="info">
        <template #value>47
        </template>
        <template #title>
          <div style="text-align: right;"></div>
        </template>


        <template #chart>
          &nbsp;
        </template>
      </CWidgetStatsA>
    </CCol>

</CRow> --></template>

<script>
// import { CChart } from '@coreui/vue-chartjs'
export default {
  name: 'WidgetsStatsA',
  components: {
    // CChart,
  },
}
</script>
