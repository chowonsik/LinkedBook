package com.linkedbook.entity;

import java.io.Serializable;
import java.util.Objects;

public class PopularCategoryPK implements Serializable {
    private static final long serialVersionUID = 1L;

    private String bookId;
    private int categoryId;

    public PopularCategoryPK(){

    }

    public PopularCategoryPK(String bookId, int categoryId){
        this.bookId = bookId;
        this.categoryId = categoryId;
    }

    // Getter, Setter
    @Override
    public boolean equals(Object obj) {
        if(this == obj) {
            return true;
        }

        if(obj == null || this.getClass() != obj.getClass()) {
            return false;
        }

        PopularCategoryPK popularCategoryPK = (PopularCategoryPK)obj;
        if(this.bookId.equals(popularCategoryPK.bookId) && this.categoryId == popularCategoryPK.categoryId ) {
            return true;
        }

        return false;
    }

    @Override
    public int hashCode() {
        return Objects.hash(bookId, categoryId);
    }
}
