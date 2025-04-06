package com.example.calculator.adapter;

import android.view.LayoutInflater;
import android.view.ViewGroup;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.example.calculator.databinding.HistoryItemBinding;

import java.util.List;

public class HistoryAdapter extends RecyclerView.Adapter<HistoryAdapter.ViewHolder> {
    private List<String> historyItems;

    public HistoryAdapter(List<String> historyItems) {
        this.historyItems = historyItems;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(parent.getContext());
        HistoryItemBinding binding = HistoryItemBinding.inflate(inflater, parent, false);
        return new ViewHolder(binding);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        holder.binding.historyEntry.setText(historyItems.get(position));
    }

    @Override
    public int getItemCount() {
        return historyItems.size();
    }

    public void updateData(List<String> newHistory) {
        historyItems = newHistory;
        notifyDataSetChanged();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        HistoryItemBinding binding;

        ViewHolder(HistoryItemBinding binding) {
            super(binding.getRoot());
            this.binding = binding;
        }
    }
}