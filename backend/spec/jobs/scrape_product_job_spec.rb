require 'rails_helper'

RSpec.describe ScrapeProductJob, type: :job do
  let(:url) { "https://www.flipkart.com/sample-product" }

  it "enqueues a job" do
    ActiveJob::Base.queue_adapter = :test # job run in test mode

    expect {
      ScrapeProductJob.perform_later(url)
    }.to have_enqueued_job(ScrapeProductJob).with(url)
  end
end
