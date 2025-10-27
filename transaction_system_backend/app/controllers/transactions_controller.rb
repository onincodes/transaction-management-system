class TransactionsController < ApplicationController
  STATUSES = ["Pending", "Settled", "Failed"].freeze

  # GET /transactions
  def index
    transactions = CsvService.read_all
    render json: transactions
  end

  # POST /transactions
  def create
    return unless validate_transaction_params

    transaction = {
      "Transaction Date"      => params[:transaction_date],
      "Account Number"        => params[:account_number],
      "Account Holder Name"   => params[:account_holder_name],
      "Amount"                => format("%.2f", params[:amount].to_f),
      "Status"                => STATUSES.sample
    }

    CsvService.append(transaction)

    render json: transaction, status: :created
  end

  private

  def validate_transaction_params
    errors = []

    cleaned_account_number = params[:account_number].to_s.gsub(/\D/, "")

    errors << "Account holder name is required" if params[:account_holder_name].blank?
    errors << "Account number is required" if params[:account_number].blank? 
    errors << "Transaction date is required" if params[:transaction_date].blank?
    errors << "Amount must be greater than 0" if params[:amount].blank? || params[:amount].to_f <= 0

    if !cleaned_account_number.empty? && cleaned_account_number.length != 12
      errors << "Account number must be exactly 12 digits"
    end

    if errors.any?
      render json: { errors: errors }, status: :unprocessable_entity
      return false
    end

    true
  end
end
